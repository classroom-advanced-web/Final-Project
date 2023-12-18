package com.example.backend.controllers;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.services.grade_composition.IGradeCompositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grade-composition")
@RequiredArgsConstructor
public class GradeCompositionController {

    private final IGradeCompositionService gradeCompositionService;

    @PostMapping("")
    public ResponseEntity<GradeCompositionDTO> createGradeComposition(@RequestParam("classroom_id") String classroomId,
                                                 @RequestBody GradeCompositionDTO gradeCompositionDTO) {
            return ResponseEntity.ok(
                    gradeCompositionService.create(classroomId, gradeCompositionDTO)
            );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GradeCompositionDTO> removeGradeComposition(@PathVariable("id") String id) {
        return ResponseEntity.ok(
                gradeCompositionService.remove(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<GradeCompositionDTO> updateGradeComposition(@PathVariable("id") String id,
                                                 @RequestBody GradeCompositionDTO gradeCompositionDTO) {
        return ResponseEntity.ok(
                gradeCompositionService.update(id, gradeCompositionDTO)
        );
    }

    @GetMapping("/classroom")
    public ResponseEntity<List<GradeCompositionDTO>> getGradeCompositionsByClassroomId(@RequestParam("classroom_id") String classroomId) {
        return ResponseEntity.ok(
                gradeCompositionService.getGradeCompositionsByClassroomId(classroomId)
        );
    }
}
