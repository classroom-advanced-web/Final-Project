package com.example.backend.controllers;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.entities.Notification;
import com.example.backend.services.notification.INotificationService;
import com.example.backend.services.notification.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    private final INotificationService notificationService;



    @GetMapping("/subscribe/{userId}")
    public ResponseEntity<SseEmitter> subscribe() {
        return ResponseEntity.ok(notificationService.subscribe());
    }

    @PostMapping("/send")
    public ResponseEntity<NotificationDTO> sendNotification(@RequestBody NotificationDTO payload) {
        return ResponseEntity.ok(notificationService.createNotification(payload));
    }

    @PostMapping("/notify")
    public ResponseEntity<Map> notifyToAllUserInClassroom(@RequestBody NotificationDTO notificationDTO) {
        return ResponseEntity.ok(notificationService.notifyToAllUserInClassroom(notificationDTO));
    }
}
