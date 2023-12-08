package com.example.backend.repositories;

import com.example.backend.entities.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {
}
