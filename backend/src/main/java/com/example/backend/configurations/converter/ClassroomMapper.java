package com.example.backend.configurations.converter;

import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.entities.Classroom;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClassroomMapper implements IMapper<Classroom, ClassroomDTO> {

    @Override
    public Classroom toEntity(ClassroomDTO obj) {
        return Classroom.builder()
                .name(obj.getName())
                .description(obj.getDescription())
                .subject(obj.getSubject())
                .code(obj.getCode())
                .room(obj.getRoom())
                .section(obj.getSection())
                .imageUrl(obj.getImageUrl())
                .build();
    }

    @Override
    public ClassroomDTO toDTO(Classroom obj) {
        return ClassroomDTO.builder()
                .id(obj.getId())
                .name(obj.getName())
                .description(obj.getDescription())
                .subject(obj.getSubject())
                .code(obj.getCode())
                .room(obj.getRoom())
                .section(obj.getSection())
                .imageUrl(obj.getImageUrl())
                .build();
    }
}
