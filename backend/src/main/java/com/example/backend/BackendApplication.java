package com.example.backend;

import com.example.backend.constants.GenderEnum;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder

    ) {
        return args -> {
            try {
                userRepository.save(
                        User.builder()
                                .firstName("Toan")
                                .lastName("Tran")
                                .email("toan@example.com")
                                .password(passwordEncoder.encode("12345"))
                                .gender(GenderEnum.MALE.name())
                                .isActivated(true)
                                .build()
                );

                userRepository.save(
                        User.builder()
                                .firstName("Truong")
                                .lastName("Vo")
                                .email("truong@example.com")
                                .password(passwordEncoder.encode("12345"))
                                .gender(GenderEnum.MALE.name())
                                .isActivated(true)
                                .build()
                );

                userRepository.save(
                        User.builder()
                                .firstName("Thang")
                                .lastName("Le")
                                .email("thang@example.com")
                                .password(passwordEncoder.encode("12345"))
                                .gender(GenderEnum.MALE.name())
                                .isActivated(true)
                                .build()
                );

                userRepository.save(
                        User.builder()
                                .firstName("Admin")
                                .lastName("")
                                .email("admin@example.com")
                                .password(passwordEncoder.encode("12345"))
                                .gender(GenderEnum.MALE.name())
                                .isAdmin(true)
                                .isActivated(true)
                                .build()
                );

            } catch (Exception e) {
                System.out.println(e.getMessage());
            }


        };

    }


}
