package com.example.backend.services.comment;

import com.example.backend.configurations.converter.CommentMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.CommentDTO;
import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Comment;
import com.example.backend.entities.Grade;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.CommentRepository;
import com.example.backend.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements ICommentService{

    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final GradeRepository gradeRepository;
    private final ClassUserRepository classUserRepository;
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

    @Override
    public List<CommentDTO> loadCommentForStudent(String userId, String gradeId) {
        List<Comment> comments = commentRepository.findByUserIdAndGradeId(userId, gradeId);
        return comments.stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    @Override
    public List<CommentDTO> loadCommentForTeacher(String gradeId) {
        return null;
    }

    @Override
    public List<CommentDTO> loadComment(String gradeId) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getStudentId() == null){
            throw new NotFoundException("User has not mapped student id");
        }
        Grade grade = gradeRepository.findById(gradeId).orElseThrow(
                () -> new NotFoundException("Grade not found")
        );
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), grade.getGradeComposition().getClassroom().getId())
                .orElseThrow(
                        () -> new NotFoundException("User is not in this class")
                );
        if(classUser.getRole().getName().equals(RoleEnum.Teacher.name()) || classUser.getRole().getName().equals(RoleEnum.Owner.name())){
            return loadCommentForTeacher(gradeId);
        }
        else if(classUser.getRole().getName().equals(RoleEnum.Student.name())){
            return loadCommentForStudent(user.getId(), gradeId);
        }

            throw new NotFoundException("Role is invalid");


    }

}
