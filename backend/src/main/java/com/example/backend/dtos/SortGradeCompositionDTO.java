package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Builder
@Data
@Getter
public class SortGradeCompositionDTO {

    @JsonProperty("classroom_id")
    String classroomId;

    @JsonProperty("grade_compositions")
    List<GradeCompositionDTO> gradeCompositions;
}
