package com.example.backend.dtos;

import com.example.backend.entities.Role;
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
}
