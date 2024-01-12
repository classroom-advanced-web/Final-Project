package com.example.backend.controllers;

import com.example.backend.dtos.GradeDTO;
import com.example.backend.services.grade.IGradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
@RequiredArgsConstructor
public class GradeController {
    private final IGradeService gradeService;

    @PostMapping("/create/student")
    public ResponseEntity<GradeDTO> createGradeForAStudent(@RequestBody GradeDTO gradeDTO) {
        return ResponseEntity.ok(gradeService.createGradeForAStudent(gradeDTO));
    }

    @GetMapping("/board/{classroomId}")
    public ResponseEntity<List> getGradeBoard(@PathVariable String classroomId) {
        return ResponseEntity.ok(gradeService.getGradeBoard(classroomId));
    }

}
