package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GradeCompositionDTO {

    String id;
    String name;
    Double scale;
    Integer weight;

    @JsonProperty("classroom_id")
    String classroomId;
}
