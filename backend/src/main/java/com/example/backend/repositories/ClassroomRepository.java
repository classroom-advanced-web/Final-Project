package com.example.backend.repositories;

import com.example.backend.entities.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

        Optional<Classroom> findByCode(String code);
}
