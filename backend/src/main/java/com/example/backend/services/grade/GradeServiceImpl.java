package com.example.backend.services.grade;

import com.example.backend.configurations.converter.GradeCompositionMapper;
import com.example.backend.configurations.converter.GradeMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.GradeDTO;
import com.example.backend.dtos.StudentGradesDTO;
import com.example.backend.dtos.StudentsClassroomRequestDTO;
import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Grade;
import com.example.backend.entities.GradeComposition;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.GradeCompositionRepository;
import com.example.backend.repositories.GradeRepository;
import com.example.backend.services.classroom.IClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements IGradeService{

    private final GradeRepository gradeRepository;
    private final GradeCompositionRepository gradeCompositionRepository;
    private final GradeMapper gradeMapper;
    private final GradeCompositionMapper gradeCompositionMapper;
    private final ClassUserRepository classUserRepository;
    private final IClassroomService classroomService;

    @Override
    public GradeDTO createGradeForAStudent(GradeDTO gradeDTO) {
        GradeComposition gradeComposition = gradeCompositionRepository.findById(gradeDTO.getGradeComposition().getId())
                .orElseThrow(
                        () -> new NotFoundException("Grade composition not found")
                );
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), gradeComposition.getClassroom().getId())
                .orElseThrow(
                        () -> new NotFoundException("Class user not found")
                );
        if (!classUser.getRole().getName().equals(RoleEnum.Teacher.name()) && !classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            throw new AccessDeniedException("You are not allowed to create grade");
        }

        Grade existedGrade = gradeRepository.findByStudentIdAndGradeCompositionId(gradeDTO.getStudentId(), gradeDTO.getGradeComposition().getId())
                .orElse(null);
        if (existedGrade != null) {
            existedGrade.setValue(gradeDTO.getValue());
            Grade savedGrade = gradeRepository.save(existedGrade);
            return gradeMapper.toDTO(savedGrade);
        }

        Grade grade = Grade.builder()
                .value(gradeDTO.getValue())
                .gradeComposition(gradeComposition)
                .studentId(gradeDTO.getStudentId())
                .build();
        Grade savedGrade = gradeRepository.save(grade);
        return gradeMapper.toDTO(savedGrade);
    }

    @Override
    public List<StudentGradesDTO> getGradeBoardForTeacher(String classroomId) {
        List<GradeComposition> gradeCompositions = gradeCompositionRepository.findByClassroomIdOrderByWeightAsc(classroomId);
        List<StudentsClassroomRequestDTO> studentsClassroomRequestDTOs = classroomService.getStudentsOfClassroom(classroomId);
        List<String> StudentIds = new ArrayList<>();
        for(StudentsClassroomRequestDTO studentsClassroomRequestDTO : studentsClassroomRequestDTOs) {
            if(studentsClassroomRequestDTO.getStudentId() != null) {
                StudentIds.add(studentsClassroomRequestDTO.getStudentId());
            }
        }
        List<StudentGradesDTO> result = new ArrayList<>();
        for(String studentId : StudentIds) {
            List<GradeDTO> gradeDTOs = new ArrayList<>();
            StudentGradesDTO studentGradesDTO = StudentGradesDTO.builder()
                    .studentId(studentId)
                    .build();
            for(GradeComposition gradeComposition : gradeCompositions) {
                Grade grade = gradeRepository.findByStudentIdAndGradeCompositionId(studentId, gradeComposition.getId())
                        .orElse(null);

                if(grade != null) {
                    gradeDTOs.add(gradeMapper.toDTO(grade));
                } else {
                    gradeDTOs.add(GradeDTO.builder()
                            .value(0.0)
                            .gradeComposition(gradeCompositionMapper.toDTO(gradeComposition))
                            .studentId(studentId)
                            .build());
                }
            }
            studentGradesDTO.setGrades(gradeDTOs);
            result.add(studentGradesDTO);
        }
        return result;
    }

    @Override
    public List<StudentGradesDTO> getGradeBoardForStudent(String classroomId) {
        List<StudentGradesDTO> result = new ArrayList<>();
        List<GradeComposition> gradeCompositions = gradeCompositionRepository.findByClassroomIdOrderByWeightAsc(classroomId);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getStudentId() == null) {
            throw new NotFoundException("Student id not found");
        }
        List<GradeDTO> gradeDTOs = new ArrayList<>();
        StudentGradesDTO studentGradesDTO = StudentGradesDTO.builder()
                .studentId(user.getStudentId())
                .build();
        for(GradeComposition gradeComposition : gradeCompositions) {
            Grade grade = gradeRepository.findByStudentIdAndGradeCompositionId(user.getStudentId(), gradeComposition.getId())
                    .orElse(null);

            if(grade != null) {
                gradeDTOs.add(gradeMapper.toDTO(grade));
            } else {
                gradeDTOs.add(GradeDTO.builder()
                        .value(0.0)
                        .gradeComposition(gradeCompositionMapper.toDTO(gradeComposition))
                        .studentId(user.getStudentId())
                        .build());
            }
        }
        studentGradesDTO.setGrades(gradeDTOs);
        result.add(studentGradesDTO);
        return result;
    }

    @Override
    public List<StudentGradesDTO> getGradeBoard(String classroomId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId)
                .orElseThrow(
                        () -> new NotFoundException("User is not in this classroom")
                );
        if (classUser.getRole().getName().equals(RoleEnum.Teacher.name()) || classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            return getGradeBoardForTeacher(classroomId);
        } else if (classUser.getRole().getName().equals(RoleEnum.Student.name())) {
            return getGradeBoardForStudent(classroomId);
        }
        throw new AccessDeniedException("Role is invalid");
    }

    @Override
    @Transactional
    public Map<String, Object> mapGradeFromList(List<StudentGradesDTO> studentGradesDTOs) {

        for(StudentGradesDTO studentGradesDTO : studentGradesDTOs) {
            GradeDTO gradeDTO = GradeDTO.builder()
                    .studentId(studentGradesDTO.getStudentId())
                    .build();
            for(GradeDTO grade : studentGradesDTO.getGrades()) {
                gradeDTO.setGradeComposition(grade.getGradeComposition());
                gradeDTO.setValue(grade.getValue());
                createGradeForAStudent(gradeDTO);
            }
        }
        return Map.of("message", "success");
    }
}
