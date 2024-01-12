package com.example.backend.repositories;

import com.example.backend.entities.GradeComposition;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GradeCompositionRepository extends JpaRepository<GradeComposition, String> {

    @Query("""
            SELECT MAX(gc.weight)
            FROM GradeComposition gc
            WHERE gc.classroom.id = :classroomId
            """)
    Optional<Integer> findMaxWeightByClassroomId(String classroomId);

    List<GradeComposition> findByClassroomIdOrderByWeightAsc(String classroomId);

    List<GradeComposition> findByClassroomId(String classroomId);
}
