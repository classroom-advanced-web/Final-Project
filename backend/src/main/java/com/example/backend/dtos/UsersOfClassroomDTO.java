package com.example.backend.dtos;

import com.example.backend.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersOfClassroomDTO {
    RoleDTO role;
    UserDTO user;
    @JsonProperty("user_name")
    String userName;
}
