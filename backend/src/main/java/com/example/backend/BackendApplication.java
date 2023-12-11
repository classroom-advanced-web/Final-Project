package com.example.backend;

import com.example.backend.constants.GenderEnum;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.InvitationEmailDTO;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.services.otp.OTPServiceImpl;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.email.EmailServiceImpl;
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
    CommandLineRunner run(RoleRepository roleRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          EmailServiceImpl emailService,
                          OTPServiceImpl otpServiceImpl
                          ) {
        return args -> {

//            emailService.sendInvitationHtmlMessage(
//                    "zduytruongz@gmail.com",
//                    "Invitation to join class",
//                    InvitationEmailDTO.builder()
//                            .url("http://localhost:3000/join-class/123456")
//                            .role(RoleEnum.Teacher.name())
//                            .className("Math")
//                            .senderName("Toan Tran")
//                            .senderEmail("tranminhtoan@gmail.com")
//                            .build()
//            );

            roleRepository.save(Role.builder()
                    .name(RoleEnum.Owner.name())
                    .build()
            );

            roleRepository.save(Role.builder()
                    .name(RoleEnum.Teacher.name())
                    .build()
            );

            roleRepository.save(Role.builder()
                    .name(RoleEnum.Student.name())
                    .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Toan")
                            .lastName("Tran")
                            .email("toan@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Truong")
                            .lastName("Vo")
                            .email("truong@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .firstName("Thang")
                            .lastName("Le")
                            .email("thang@example.com")
                            .password(passwordEncoder.encode("12345"))
                            .gender(GenderEnum.MALE.name())
                            .build()
            );

        };

    }



}
