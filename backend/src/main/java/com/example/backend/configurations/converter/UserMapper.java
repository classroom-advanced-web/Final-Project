package com.example.backend.configurations.converter;

import com.example.backend.constants.GenderEnum;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entities.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserMapper implements Mapper<User, UserDTO>{
    @Override
    public User toEntity(UserDTO obj) {
        return User.builder()
//                .id(obj.getId())
                .email(obj.getEmail())
                .firstName(obj.getFirstName())
                .lastName(obj.getLastName())
                .gender(obj.getGender() == null ? "UNKNOWN" : obj.getGender().name())
                .DOB(obj.getDOB())
                .build();
    }

    @Override
    public UserDTO toDTO(User obj) {
        return UserDTO.builder()
                .id(obj.getId())
                .email(obj.getEmail())
                .firstName(obj.getFirstName())
                .lastName(obj.getLastName())
                .gender(GenderEnum.valueOf(obj.getGender()))
                .DOB(obj.getDOB())
                .build();
    }
}
