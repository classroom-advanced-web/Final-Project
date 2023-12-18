package com.example.backend.repositories;

import com.example.backend.entities.GradeComposition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeCompositionRepository extends JpaRepository<GradeComposition, String> {

    int findMaxWeightByClassroomId(String classroomId);
}
