package com.example.backend.controllers;

import com.example.backend.dtos.GradeDTO;
import com.example.backend.dtos.StudentGradesDTO;
import com.example.backend.services.grade.IGradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/board/file-update")
    public ResponseEntity<Map> updateGradeBoard(@RequestBody List<StudentGradesDTO> studentGradesDTOs) {
        return ResponseEntity.ok(gradeService.mapGradeFromList(studentGradesDTOs));
    }
}
