package com.example.backend.services.grade_composition;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.dtos.SortGradeCompositionDTO;

import java.util.List;

public interface IGradeCompositionService {

    GradeCompositionDTO create(String classroomId, GradeCompositionDTO gradeCompositionDTO) ;

    GradeCompositionDTO remove(String id);

    GradeCompositionDTO update(String id, GradeCompositionDTO gradeCompositionDTO);

    List<GradeCompositionDTO> getGradeCompositionsByClassroomId(String classroomId);

    SortGradeCompositionDTO sortGradeCompositions(SortGradeCompositionDTO sortGradeCompositionDTO);

    GradeCompositionDTO changeFinalStatus(String id, Boolean isFinal);

}
