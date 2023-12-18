package com.example.backend.services.grade_composition;

import com.example.backend.configurations.converter.GradeCompositionMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.GradeCompositionDTO;
import com.example.backend.entities.*;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.ClassroomRepository;
import com.example.backend.repositories.GradeCompositionRepository;
import com.example.backend.services.helper.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GradeCompositionServiceImpl implements IGradeCompositionService{

    private final GradeCompositionRepository gradeCompositionRepository;
    private final ClassroomRepository classroomRepository;
    private final ClassUserRepository classUserRepository;
    private final GradeCompositionMapper gradeCompositionMapper;
    private final Helper helper;


    @Override
    public GradeCompositionDTO create(String classroomId, GradeCompositionDTO gradeCompositionDTO) {

        GradeComposition gradeComposition = gradeCompositionMapper.toEntity(gradeCompositionDTO);
        Classroom classroom = classroomRepository.findById(classroomId).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        preAuthorize(user, classroom);

        gradeComposition.setClassroom(classroom);
        System.out.println(gradeCompositionRepository.findMaxWeightByClassroomId(classroomId));
        Integer maxWeight = gradeCompositionRepository.findMaxWeightByClassroomId(classroomId).orElse(0);
        gradeComposition.setWeight(maxWeight + 1);

        return gradeCompositionMapper.toDTO(gradeCompositionRepository.save(gradeComposition));
    }

    @Override
    public GradeCompositionDTO remove(String id) {

        GradeComposition gradeComposition = gradeCompositionRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Grade composition not found")
        );
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        preAuthorize(user, gradeComposition.getClassroom());

       gradeComposition.setRevoked(true);



        return gradeCompositionMapper.toDTO(gradeCompositionRepository.save(gradeComposition));
    }

    @Override
    public GradeCompositionDTO update(String id, GradeCompositionDTO gradeCompositionDTO) {

        GradeComposition gradeComposition = gradeCompositionRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Grade composition not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        preAuthorize(user, gradeComposition.getClassroom());

        Set<String> ignoreFields = helper.getNullPropertyNames(gradeCompositionDTO);
        ignoreFields.add("id");
        ignoreFields.add("classroomId");
        BeanUtils.copyProperties(gradeCompositionDTO, gradeComposition, ignoreFields.toArray(new String[0]));


        return gradeCompositionMapper.toDTO(gradeCompositionRepository.save(gradeComposition));
    }

    @Override
    public List<GradeCompositionDTO> getGradeCompositionsByClassroomId(String classroomId) {

        return gradeCompositionRepository
                .findByClassroomIdOrderByWeightAsc(classroomId)
                .stream()
                .map(gradeCompositionMapper::toDTO)
                .collect(Collectors.toList());
    }

    private void preAuthorize(User user, Classroom classroom) {
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroom.getId()).orElseThrow(
                () -> new NotFoundException("User is not in classroom")
        );
        if(!classUser.getRole().getName().equals(RoleEnum.Owner.name())
                && !classUser.getRole().getName().equals(RoleEnum.Teacher.name())
        )
        {
            throw new AccessDeniedException("User have not the right");
        }

    }
}
