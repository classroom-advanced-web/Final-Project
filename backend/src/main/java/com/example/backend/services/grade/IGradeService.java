package com.example.backend.services.grade;

import com.example.backend.dtos.GradeDTO;
import com.example.backend.dtos.StudentGradesDTO;

import java.util.List;
import java.util.Map;

public interface IGradeService {

    GradeDTO createGradeForAStudent(GradeDTO gradeDTO);

    List<StudentGradesDTO> getGradeBoard(String classroomId);

    Map<String, Object> mapGradeFromList(List<StudentGradesDTO> studentGradesDTOs);
}
