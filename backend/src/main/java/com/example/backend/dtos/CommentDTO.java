package com.example.backend.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentDTO {

    String id;
    String content;

}
