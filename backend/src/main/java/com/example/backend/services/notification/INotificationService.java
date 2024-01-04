package com.example.backend.services.notification;

import com.example.backend.dtos.NotificationDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface INotificationService {

    SseEmitter subscribe();

    NotificationDTO createNotification(NotificationDTO notificationDTO);

    Map<String, String> notifyToAllUserInClassroom(NotificationDTO notificationDTO);
}
