package com.example.backend.repositories;

import com.example.backend.entities.GradeComposition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeCompositionRepository extends JpaRepository<GradeComposition, String> {

    Optional<Integer> findMaxWeightByClassroomId(String classroomId);
}
