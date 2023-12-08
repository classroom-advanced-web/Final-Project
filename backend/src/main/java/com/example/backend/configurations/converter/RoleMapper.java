package com.example.backend.configurations.converter;

import com.example.backend.dtos.RoleDTO;
import com.example.backend.entities.Role;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleMapper implements IMapper<Role, RoleDTO>{
    @Override
    public Role toEntity(RoleDTO obj) {
        return null;
    }

    @Override
    public RoleDTO toDTO(Role obj) {
        return RoleDTO.builder()
                .id(obj.getId())
                .name(obj.getName())
                .build();
    }
}
