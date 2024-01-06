package com.example.backend.configurations.converter;

import com.example.backend.dtos.NotificationDTO;
import com.example.backend.entities.Notification;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationMapper implements IMapper<Notification, NotificationDTO>{

    @Override
    public Notification toEntity(NotificationDTO obj) {
        return null;
    }

    @Override
    public NotificationDTO toDTO(Notification obj) {
        return NotificationDTO.builder()
                .id(obj.getId())
                .title(obj.getTitle())
                .content(obj.getContent())
                .isRead(obj.isRead())
                .senderId(obj.getSender().getId())
                .classroomId(obj.getSender().getClassroom().getId())
                .build();
    }
}
