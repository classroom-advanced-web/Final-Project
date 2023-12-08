package com.example.backend.repositories;

import com.example.backend.entities.ClassUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {
}
