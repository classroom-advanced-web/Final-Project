package com.example.backend.controllers;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.services.grade_composition.IGradeCompositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/grade-compositions")
@RequiredArgsConstructor
public class GradeCompositionController {

    private final IGradeCompositionService gradeCompositionService;

    @PostMapping("/create")
    public ResponseEntity<GradeCompositionDTO> createGradeComposition(@RequestParam("classroom_id") String classroomId,
                                                 @RequestBody GradeCompositionDTO gradeCompositionDTO) throws AccessDeniedException {
            return ResponseEntity.ok(
                    gradeCompositionService.create(classroomId, gradeCompositionDTO)
            );
    }
}
