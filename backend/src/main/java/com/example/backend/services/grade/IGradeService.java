package com.example.backend.services.grade;

import com.example.backend.dtos.GradeDTO;
import com.example.backend.dtos.StudentGradesDTO;

import java.util.List;

public interface IGradeService {

    GradeDTO createGradeForAStudent(GradeDTO gradeDTO);

    List<StudentGradesDTO> getGradeBoard(String classroomId);
}
