package com.example.backend.controllers;

import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.JoinClassRequestDTO;
import com.example.backend.dtos.UsersOfClassroomDTO;
import com.example.backend.services.classroom.IClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/classrooms")
@RequiredArgsConstructor
public class ClassroomController {

    private final IClassroomService classroomService;

    @PostMapping("/create")
    public ResponseEntity<ClassroomDTO> createClassRoom(@RequestBody ClassroomDTO classRoomDTO) {
        return ResponseEntity.ok(
                classroomService.createClassRoom(classRoomDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomDTO> getClassRoom(@PathVariable Long id) throws AccessDeniedException {



        return ResponseEntity.ok(classroomService.getClassRoom(id));
    }

    @PostMapping("/join")
    public ResponseEntity<Map<String, Long>> joinClassRoom(@RequestBody JoinClassRequestDTO body) {
        return ResponseEntity.ok(
                classroomService.joinClassRoom(body)
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ClassroomDTO> updateClassRoom(@PathVariable Long id, @RequestBody ClassroomDTO classRoomDTO) throws AccessDeniedException {
        return ResponseEntity.ok(
                classroomService.updateClassRoom(id, classRoomDTO)
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<UsersOfClassroomDTO>> getUsersOfClassroom(@PathVariable Long id) throws AccessDeniedException {
        return ResponseEntity.ok(
                classroomService.getUsersOfClassroom(id)
        );
    }
}
