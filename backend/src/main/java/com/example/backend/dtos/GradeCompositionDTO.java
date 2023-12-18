package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GradeCompositionDTO {

    String id;
    String name;
    Double scale;
    Integer weight;

    @JsonProperty("classroom_id")
    String classroomId;
}
