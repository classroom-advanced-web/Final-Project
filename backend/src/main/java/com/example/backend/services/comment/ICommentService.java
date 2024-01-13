package com.example.backend.services.comment;

import com.example.backend.dtos.CommentDTO;

import java.util.List;

public interface ICommentService {

    CommentDTO createComment(CommentDTO commentDTO);

    List<CommentDTO> loadCommentForStudent(String userId, String gradeId);

    List<CommentDTO> loadCommentForTeacher(String userId, String classroomId);

    List<CommentDTO> loadComment(String gradeId, String classroomId);

    List<CommentDTO> loadReplyComment(String commentId);

    CommentDTO changeShutDownStatus(String commentId, Boolean status, String classroomId);




}
