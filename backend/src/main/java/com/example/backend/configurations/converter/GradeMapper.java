package com.example.backend.configurations.converter;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.dtos.GradeDTO;
import com.example.backend.entities.Grade;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GradeMapper implements IMapper<Grade, GradeDTO>{
    @Override
    public Grade toEntity(GradeDTO obj) {
        return null;
    }

    @Override
    public GradeDTO toDTO(Grade obj) {
        return GradeDTO.builder()
                .id(obj.getId())
                .value(obj.getValue())
                .gradeComposition(GradeCompositionDTO.builder()
                        .id(obj.getGradeComposition().getId())
                        .name(obj.getGradeComposition().getName())
                        .scale(obj.getGradeComposition().getScale())
                        .weight(obj.getGradeComposition().getWeight())
                        .classroomId(obj.getGradeComposition().getClassroom().getId())
                        .build())
.studentId(obj.getStudentId())
                .build();
    }
}
