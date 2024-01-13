package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentDTO {

    String id;
    String content;
    @JsonProperty("is_shut_down")
    Boolean isShutDown;
    @JsonProperty("reply_to")
    CommentDTO replyTo;

    UserDTO user;
    GradeDTO grade;

}
