package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.api.client.util.DateTime;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Builder
@Getter
public class NotificationDTO {
    String id;
    String title;
    String content;
    @JsonProperty("is_read")
    Boolean isRead;
    @JsonProperty("classroom_id")
    String classroomId;
    @JsonProperty("sender_id")
    String senderId;
    @JsonProperty("created_at")
    Date createdAt;
}
