package com.example.backend.repositories;

import com.example.backend.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, String> {
    Optional<Grade> findByStudentIdAndGradeCompositionId(String studentId, String id);

    List<Grade> findByGradeCompositionId(String compositionId);
}
