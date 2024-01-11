package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
@Data
public class GradeDTO {

    String id;
    Double value;

    GradeCompositionDTO gradeComposition;

    @JsonProperty("student_id")
    String studentId;
}
