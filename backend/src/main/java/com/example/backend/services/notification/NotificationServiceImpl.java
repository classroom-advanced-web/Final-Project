package com.example.backend.services.notification;

import com.example.backend.configurations.converter.NotificationMapper;
import com.example.backend.configurations.converter.UserMapper;
import com.example.backend.dtos.NotificationDTO;
import com.example.backend.dtos.NotificationResponseDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Notification;
import com.example.backend.entities.ReceivedNotification;
import com.example.backend.entities.User;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.NotificationRepository;
import com.example.backend.repositories.ReceivedNotificationRepository;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
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



    @Override
    public SseEmitter subscribe(String userId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String id = user.getId();
        SseEmitter emitter = new SseEmitter();
        userEmitters.put(id, emitter);
        emitter.onCompletion(() -> userEmitters.remove(id));
        emitter.onTimeout(() -> userEmitters.remove(id));
        return emitter;
    }

    @Override
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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
        notifyToAllUserInClassroom(notificationDTO);

        return notificationMapper.toDTO(notificationRepository.save(notification));
    }

    @Override
    public Map<String, String> notifyToAllUserInClassroom(NotificationDTO notificationDTO) {
        List<ClassUser> receivers = classUserRepository.findAllByClassroomId(notificationDTO.getClassroomId());
        receivers.forEach(receiver -> {
            SseEmitter emitter = userEmitters.get(receiver.getUser().getId());
            if(emitter != null) {
                UserDTO sender = userMapper.toDTO(userRepository.findById(receiver.getUser().getId()).get());
                NotificationResponseDTO notificationResponseDTO = NotificationResponseDTO.builder()
                        .notification(notificationDTO)
                        .sender(sender)
                        .build();
                try {
                    emitter.send(SseEmitter.event()
                            .name("notification")
                            .data(notificationResponseDTO)
                            .build());
                } catch (IOException e) {
                    emitter.completeWithError(e);
                    userEmitters.remove(receiver.getUser().getId(), emitter);
                    e.printStackTrace();
                }
            }
            ReceivedNotification receivedNotification = ReceivedNotification.builder()
                    .receiver(userRepository.findById(receiver.getUser().getId()).get())
                    .notification(notificationRepository.findById(notificationDTO.getId()).get())
                    .build();
            receivedNotificationRepository.save(receivedNotification);
        });
        Map<String, String> response = new HashMap<>();
        response.put("message", "OK");
        return response;
    }
}
