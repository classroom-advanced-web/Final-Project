package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JoinClassByEmailRequestDTO {

    @JsonProperty("access_token")
    String accessToken;

    @JsonProperty("role_id")
    Long roleId;

    @JsonProperty("classroom_code")
    String classroomCode;
}
