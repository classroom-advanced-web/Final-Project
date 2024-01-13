package com.example.backend.controllers;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.services.notification.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    private final INotificationService notificationService;
//    private final SimpleBrokerMessageHandler simpleBrokerMessageHandler;
    private final SimpMessagingTemplate simpMessagingTemplate;

//    @GetMapping("/info")
    @MessageMapping("/notifications")
    public NotificationDTO receive(@Payload NotificationDTO notificationDTO) {

//        simpMessagingTemplate.convertAndSend("/user/" + message.get("user_id"),message.get("message"));
//        notificationService.createNotification(notificationDTO);
        return notificationService.createNotification(notificationDTO);
    }

    @GetMapping()
    public ResponseEntity<Map> getNotifications() {
        return ResponseEntity.ok(
                Map.of("notifications", notificationService.getNotifications())
        );
    }

    @GetMapping("/status/all")
    public ResponseEntity<Map> setAllNotificationsAsRead() {
        return ResponseEntity.ok(
                Map.of("message", notificationService.setAllNotificationsAsRead())
        );
    }


}
