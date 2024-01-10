package com.example.backend.repositories;

import com.example.backend.entities.ClassUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, String> {
    boolean existsByUserIdAndClassroomId(String userId, String classroomId);

    List<ClassUser> findByUserId(String userId);

    List<ClassUser> findByClassroomId(String classroomId);


    Optional<ClassUser> findByUserIdAndClassroomId(String userId, String classroomId);

    List<ClassUser> findAllByClassroomId(String classroomId);

  List<ClassUser> findByClassroomIdAndRoleName(String classroomId, String roleName);
}
