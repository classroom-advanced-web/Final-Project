package com.example.backend.repositories;

import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Classroom;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {
    boolean existsByUserAndClassroom(User user, Classroom classRoom);
}
