package com.example.backend.configurations.converter;

import com.example.backend.dtos.CommentDTO;
import com.example.backend.entities.Comment;

public class CommentMapper implements IMapper<Comment, CommentDTO>{
    @Override
    public Comment toEntity(CommentDTO obj) {
        return null;
    }

    @Override
    public CommentDTO toDTO(Comment obj) {
        return CommentDTO.builder()
                .id(obj.getId())
                .content(obj.getContent())
                .build();
    }
}
