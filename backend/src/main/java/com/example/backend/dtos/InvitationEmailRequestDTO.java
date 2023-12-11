package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class InvitationEmailRequestDTO {

    @JsonProperty("redirect_url")
    String redirectUrl;

    @JsonProperty("receiver_email")
    String receiverEmail;

    @JsonProperty("role_id")
    Long roleId;

    @JsonProperty("classroom_id")
    Long classroomId;
}
