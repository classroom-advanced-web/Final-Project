package com.example.backend.services.notification;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.dtos.NotificationResponseDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;

public interface INotificationService {

    SseEmitter subscribe(String userId);

    NotificationDTO createNotification(NotificationDTO notificationDTO);

    Map<String, String> notifyToAllUserInClassroom(NotificationDTO notificationDTO);

    List<NotificationResponseDTO> getNotifications();
}
