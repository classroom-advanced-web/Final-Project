package com.example.backend.services.notification;

import com.example.backend.configurations.converter.ClassroomMapper;
import com.example.backend.configurations.converter.NotificationMapper;
import com.example.backend.configurations.converter.UserMapper;
import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.NotificationDTO;
import com.example.backend.dtos.NotificationResponseDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Notification;
import com.example.backend.entities.ReceivedNotification;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AuthenticationErrorException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.NotificationRepository;
import com.example.backend.repositories.ReceivedNotificationRepository;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements INotificationService {

    private final Map<String, SseEmitter> userEmitters;
    private final NotificationRepository notificationRepository;
    private final ReceivedNotificationRepository receivedNotificationRepository;
    private final ClassUserRepository classUserRepository;
    private final NotificationMapper notificationMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ClassroomMapper classroomMapper;



    @Override
    public SseEmitter subscribe(String userId) {

//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        SseEmitter emitter = new SseEmitter();
        userEmitters.put(userId, emitter);
        emitter.onCompletion(() -> userEmitters.remove(userId));
        emitter.onTimeout(() -> userEmitters.remove(userId));
        return emitter;



    }

    @Override
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {

        User user = userRepository.findById(notificationDTO.getSenderId()).get();
        ClassUser sender = classUserRepository
                .findByUserIdAndClassroomId(user.getId(), notificationDTO.getClassroomId())
                .orElseThrow(
                        () -> new AccessDeniedException("User is not in this classroom")
                );
        Notification notification = Notification.builder()
                .title(notificationDTO.getTitle())
                .content(notificationDTO.getContent())
                .sender(sender)
                .build();

        NotificationDTO newNotification = notificationMapper.toDTO(notificationRepository.save(notification));
        notifyToAllUserInClassroom(newNotification);
        return newNotification;
    }

    @Override
    public Map<String, String> notifyToAllUserInClassroom(NotificationDTO notificationDTO) {
        List<ClassUser> receivers = classUserRepository.findAllByClassroomId(notificationDTO.getClassroomId());
        receivers.forEach(receiver -> {

                Notification notification = notificationRepository.findById(notificationDTO.getId()).get();
                UserDTO sender = userMapper.toDTO(notification.getSender().getUser());
            ClassroomDTO classroom = classroomMapper.toDTO(notification.getSender().getClassroom());
                NotificationResponseDTO notificationResponseDTO = NotificationResponseDTO.builder()
                        .notification(notificationDTO)
                        .sender(sender)
                        .classroom(classroom)
                        .build();

            simpMessagingTemplate.convertAndSendToUser(receiver.getUser().getId(),"/receiver", notificationResponseDTO);
            ReceivedNotification receivedNotification = ReceivedNotification.builder()
                    .receiver(userRepository.findById(receiver.getUser().getId()).get())
                    .notification(notification)
                    .build();
            receivedNotificationRepository.save(receivedNotification);
        });
        Map<String, String> response = new HashMap<>();
        response.put("message", "OK");
        return response;
    }

    @Override
    public List<NotificationResponseDTO> getNotifications() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user == null) {
            throw new AuthenticationErrorException("User is not logged in");
        }
        List<Notification> notifications = receivedNotificationRepository.findAllByReceiverId(user.getId())
                .stream()
                .map(ReceivedNotification::getNotification)
                .toList();

        return notifications.stream()
                .map(notification -> {
                    NotificationDTO notificationDTO = notificationMapper.toDTO(notification);
                    UserDTO sender = userMapper.toDTO(notification.getSender().getUser());
                    ClassroomDTO classroom = classroomMapper.toDTO(notification.getSender().getClassroom());
                    return NotificationResponseDTO.builder()
                            .notification(notificationDTO)
                            .sender(sender)
                            .classroom(classroom)
                            .build();
                })
                .toList();
    }
}
