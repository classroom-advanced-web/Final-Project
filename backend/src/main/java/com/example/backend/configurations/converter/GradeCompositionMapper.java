package com.example.backend.configurations.converter;

import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.entities.GradeComposition;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GradeCompositionMapper implements IMapper<GradeComposition, GradeCompositionDTO>{
    @Override
    public GradeComposition toEntity(GradeCompositionDTO obj) {
        return GradeComposition.builder()
                .id(obj.getId())
                .name(obj.getName())
                .scale(Double.parseDouble(obj.getScale()))
                .weight(Integer.parseInt(obj.getWeight()))
                .build();
    }

    @Override
    public GradeCompositionDTO toDTO(GradeComposition obj) {
        return GradeCompositionDTO.builder()
                .id(obj.getId())
                .name(obj.getName())
                .scale(obj.getScale().toString())
                .weight(String.valueOf(obj.getWeight()))
                .classroomId(obj.getClassroom().getId())
                .build();

    }
}
