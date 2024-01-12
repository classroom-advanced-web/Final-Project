package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudentsClassroomRequestDTO {

    @JsonProperty("account_id")
    String accountId;

    @JsonProperty("student_id")
    String studentId;

    @JsonProperty("student_name")
    String studentName;

    @JsonProperty("classroom_id")
    String classroomId;

}
