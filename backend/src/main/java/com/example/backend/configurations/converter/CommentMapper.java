package com.example.backend.configurations.converter;

import com.example.backend.dtos.CommentDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entities.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class CommentMapper implements IMapper<Comment, CommentDTO>{

    private final UserMapper userMapper;
    private final GradeMapper gradeMapper;
    @Override
    public Comment toEntity(CommentDTO obj) {
        return null;
    }

    @Override
    public CommentDTO toDTO(Comment obj) {
        return CommentDTO.builder()
                .id(obj.getId())
                .content(obj.getContent())
                .isShutDown(obj.isShutDown())
                .replyTo(obj.getReplyTo() == null ? null : toDTO(obj.getReplyTo()))
                .user(userMapper.toDTO(obj.getUser()))
                .grade(gradeMapper.toDTO(obj.getGrade()))
                .createdAt(obj.getCreatedDate())
                .build();
    }
}
