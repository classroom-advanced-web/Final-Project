package com.example.backend.controllers;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.entities.Notification;
import com.example.backend.services.notification.INotificationService;
import com.example.backend.services.notification.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

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
        notificationService.createNotification(notificationDTO);
        return notificationService.createNotification(notificationDTO);
    }


}
