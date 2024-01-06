package com.example.backend.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationResponseDTO {

    NotificationDTO notification;
    UserDTO sender;
    ClassroomDTO classroom;
}
