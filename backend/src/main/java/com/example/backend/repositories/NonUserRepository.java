package com.example.backend.repositories;

import com.example.backend.entities.NonUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NonUserRepository extends JpaRepository<NonUser, String> {
    List<NonUser> findByClassroomId(String classroomId);

    Optional<NonUser> findByStudentIdAndClassroomId(String studentId, String classroomId);
}
