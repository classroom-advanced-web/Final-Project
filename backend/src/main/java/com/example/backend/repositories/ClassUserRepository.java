package com.example.backend.repositories;

import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Classroom;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {
    boolean existsByUserIdAndClassroomId(Long userId, Long classroomId);

    List<ClassUser> findByUserId(Long userId);

    Optional<ClassUser> findByUserIdAndClassroomId(Long userId, Long classroomId);


}
