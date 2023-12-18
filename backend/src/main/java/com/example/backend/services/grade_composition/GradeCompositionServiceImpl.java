package com.example.backend.services.grade_composition;

import com.example.backend.configurations.converter.GradeCompositionMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.entities.*;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.ClassroomRepository;
import com.example.backend.repositories.GradeCompositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GradeCompositionServiceImpl implements IGradeCompositionService{

    private final GradeCompositionRepository gradeCompositionRepository;
    private final ClassroomRepository classroomRepository;
    private final ClassUserRepository classUserRepository;
    private final GradeCompositionMapper gradeCompositionMapper;


    @Override
    public GradeCompositionDTO create(String classroomId, GradeCompositionDTO gradeCompositionDTO) throws AccessDeniedException {

        GradeComposition gradeComposition = gradeCompositionMapper.toEntity(gradeCompositionDTO);
        Classroom classroom = classroomRepository.findById(classroomId).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId).orElseThrow(
                () -> new NotFoundException("User is not in classroom")
        );
        if(!classUser.getRole().getName().equals(RoleEnum.Owner.name())
        && !classUser.getRole().getName().equals(RoleEnum.Teacher.name())
        )
        {throw new AccessDeniedException("User have not the right");}


        gradeComposition.setClassroom(classroom);
        Integer maxWeight = gradeCompositionRepository.findMaxWeightByClassroomId(classroomId).orElse(0);
        gradeComposition.setWeight(maxWeight + 1);

        return gradeCompositionMapper.toDTO(gradeCompositionRepository.save(gradeComposition));
    }

    @Override
    public GradeCompositionDTO remove(String id) {

        GradeComposition gradeComposition = gradeCompositionRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Grade composition not found")
        );

       gradeComposition.setRevoked(true);



        return gradeCompositionMapper.toDTO(gradeCompositionRepository.save(gradeComposition));
    }
}
