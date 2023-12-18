package com.example.backend.services.grade_composition;

import com.example.backend.dtos.GradeCompositionDTO;

import java.nio.file.AccessDeniedException;
import java.util.Map;

public interface IGradeCompositionService {

    GradeCompositionDTO create(String classroomId, GradeCompositionDTO gradeCompositionDTO) throws AccessDeniedException;

    Map<String, String> remove(String id);

}
