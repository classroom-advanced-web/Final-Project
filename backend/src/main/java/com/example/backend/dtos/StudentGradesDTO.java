package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StudentGradesDTO {

    @JsonProperty("student_id")
    String studentId;
    List<GradeDTO> grades;

}
