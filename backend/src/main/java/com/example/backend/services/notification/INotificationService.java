package com.example.backend.services.notification;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.dtos.NotificationResponseDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface INotificationService {

    SseEmitter subscribe(String userId);

    NotificationDTO createNotification(NotificationDTO notificationDTO);

    void notifyToAllUserInClassroom(NotificationDTO notificationDTO);

    void notifyToUser(String userId, NotificationDTO notificationDTO);

    List<NotificationResponseDTO> getNotifications();

    String setAllNotificationsAsRead();

}
