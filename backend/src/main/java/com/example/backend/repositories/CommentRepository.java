package com.example.backend.repositories;

import com.example.backend.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByUserId(String userId);

    List<Comment> findByUserIdAndGradeId(String userId, String gradeId);

    List<Comment> findByUserIdAndGradeIdAndReplyToId(String userId, String gradeId, String replyToId);

    List<Comment> findByUserIdAndReplyToId(String userId, String replyToId);

    List<Comment> findByGradeIdAndReplyToId(String userId, String replyToId);

    List<Comment> findByReplyToId(String commentId);
}
