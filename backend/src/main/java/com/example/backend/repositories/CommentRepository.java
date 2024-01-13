package com.example.backend.repositories;

import com.example.backend.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByUserId(String userId);

    List<Comment> findByUserIdAndGradeId(String userId, String gradeId);
}
