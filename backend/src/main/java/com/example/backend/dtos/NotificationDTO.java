package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NotificationDTO {
    String id;
    String title;
    String content;
    @JsonProperty("is_read")
    Boolean isRead;
    String classroomId;
}
