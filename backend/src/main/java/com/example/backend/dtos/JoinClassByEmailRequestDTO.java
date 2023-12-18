package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
public class JoinClassByEmailRequestDTO {

    @JsonProperty("invitation_id")
    private Long invitationId;
}
