package com.example.backend.services.comment;

import com.example.backend.configurations.converter.CommentMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.CommentDTO;
import com.example.backend.entities.*;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.CommentRepository;
import com.example.backend.repositories.GradeCompositionRepository;
import com.example.backend.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements ICommentService{

    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final GradeRepository gradeRepository;
    private final GradeCompositionRepository gradeCompositionRepository;
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
        if(!gradeRepository.existsById(gradeId)){
            throw new NotFoundException("Grade not found");
        }
        List<Comment> comments = commentRepository.findByUserIdAndGradeIdAndReplyToId(userId, gradeId, null);
        return comments.stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    @Override
    public List<CommentDTO> loadCommentForTeacher(String userId, String classroomId) {
        List<GradeComposition> gradeCompositions = gradeCompositionRepository.findByClassroomId(classroomId);
        List<String> gradeIds = new ArrayList<>();
        for(GradeComposition gradeComposition : gradeCompositions){
            gradeRepository.findByGradeCompositionId(gradeComposition.getId())
                    .forEach(grade -> gradeIds.add(grade.getId()));
        }
        List<Comment> comments = new ArrayList<>();
        for(String gradeId : gradeIds){
            comments.addAll(commentRepository.findByGradeIdAndReplyToId(gradeId, null));
        }

        return comments.stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    @Override
    public List<CommentDTO> loadComment(String gradeId, String classroomId) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId)
                .orElseThrow(
                        () -> new NotFoundException("User is not in this class")
                );
        if(classUser.getRole().getName().equals(RoleEnum.Teacher.name()) || classUser.getRole().getName().equals(RoleEnum.Owner.name())){
            return loadCommentForTeacher(user.getId(), classroomId);
        }
        else if(classUser.getRole().getName().equals(RoleEnum.Student.name())){
            if(user.getStudentId() == null){
                throw new NotFoundException("User has not mapped student id");
            }
            return loadCommentForStudent(user.getId(), gradeId);
        }

            throw new NotFoundException("Role is invalid");


    }

    @Override
    public List<CommentDTO> loadReplyComment(String commentId) {
        List<Comment> comments = commentRepository.findByReplyToId(commentId);

            return comments.stream()
                    .map(comment -> commentMapper.toDTO(comment))
                    .toList();
    }

}
