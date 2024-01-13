package com.example.backend.services.comment;

import com.example.backend.configurations.converter.CommentMapper;
import com.example.backend.dtos.CommentDTO;
import com.example.backend.entities.Comment;
import com.example.backend.entities.Grade;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.CommentRepository;
import com.example.backend.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements ICommentService{

    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final GradeRepository gradeRepository;
    @Override
    public CommentDTO createComment(CommentDTO commentDTO) {
        Grade grade = gradeRepository.findById(commentDTO.getGrade().getId()).orElseThrow(
                () -> new NotFoundException("Grade not found")
        );
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Comment comment = Comment.builder()
                .content(commentDTO.getContent())
                .replyTo(commentDTO.getReplyTo() == null ? null : commentRepository.findById(commentDTO.getReplyTo().getId()).orElseThrow(
                        () -> new NotFoundException("Reply to comment not found")
                ))
                .grade(grade)
                .user(user)
                .build();
        return commentMapper.toDTO(commentRepository.save(comment));
    }

}
