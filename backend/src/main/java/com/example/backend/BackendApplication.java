package com.example.backend;

import com.example.backend.constants.GenderEnum;
import com.example.backend.constants.RoleEnum;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.google.GoogleServiceImpl;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder
                          ) {
        return args -> {

            Role student = Role.builder()
                    .name(RoleEnum.STUDENT.name())
                    .build();

            roleRepository.save(
                    student
            );

            roleRepository.save(
                    Role.builder()
                            .name(RoleEnum.TEACHER.name())
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Toan")
                            .lastName("Tran")
                            .email("toan@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .role(student)
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Truong")
                            .lastName("Vo")
                            .email("truong@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .role(student)
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Thang")
                            .lastName("Le")
                            .email("thang@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .role(student)
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

        };

    }



}
