package com.example.backend.dtos;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RoleDTO {

    Long code;

    String name;
}
