package com.example.backend.repositories;

import com.example.backend.entities.Classroom;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClassroomRepository extends JpaRepository<Classroom, String> {

        Optional<Classroom> findByCode(String code);

        @Query(value = "SELECT * FROM classrooms",
                nativeQuery = true
        )
        List<Classroom> findAllByAdmin();

        @Query(value = "SELECT * FROM classrooms c WHERE c.class_id = ?1 ",
                nativeQuery = true
        )
        Optional<Classroom> findByIdForAdmin(String classroomId);
}
