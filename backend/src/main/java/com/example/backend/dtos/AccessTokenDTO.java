package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AccessTokenDTO {

    @JsonProperty("access_token")
    String accessToken;
}
