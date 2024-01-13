package com.example.backend.configurations.converter;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.entities.GradeComposition;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GradeCompositionMapper implements IMapper<GradeComposition, GradeCompositionDTO>{
    @Override
    public GradeComposition toEntity(GradeCompositionDTO obj) {
        return GradeComposition.builder()
                .name(obj.getName())
                .scale(obj.getScale())
                .build();
    }

    @Override
    public GradeCompositionDTO toDTO(GradeComposition obj) {
        return GradeCompositionDTO.builder()
                .id(obj.getId())
                .name(obj.getName())
                .scale(obj.getScale())
                .weight(obj.getWeight())
                .isFinal(obj.isFinal())
                .classroomId(obj.getClassroom().getId())
                .build();

    }
}
