package com.example.backend.services.grade_composition;

import com.example.backend.dtos.GradeCompositionDTO;

import java.nio.file.AccessDeniedException;

public interface IGradeCompositionService {

    GradeCompositionDTO create(String classroomId, GradeCompositionDTO gradeCompositionDTO) throws AccessDeniedException;

}
