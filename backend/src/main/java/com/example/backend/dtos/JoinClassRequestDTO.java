package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class JoinClassRequestDTO {

    @JsonProperty("class _id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Long classId;


    String code;

    @JsonProperty("role_id")
    Long roleId;


}
