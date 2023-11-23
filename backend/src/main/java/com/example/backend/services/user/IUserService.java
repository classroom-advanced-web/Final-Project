package com.example.backend.services.user;

import com.example.backend.dtos.AuthenticationResponseDTO;
import com.example.backend.dtos.LoginDTO;
import com.example.backend.dtos.RegisterDTO;
import com.example.backend.dtos.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.stereotype.Service;


public interface IUserService {

    AuthenticationResponseDTO login(@NonNull LoginDTO loginDTO);

    AuthenticationResponseDTO register(@NonNull RegisterDTO newUserDTO);
    AuthenticationResponseDTO refreshToken(@NonNull HttpServletRequest request,
                                           @NonNull HttpServletResponse response);

    UserDTO getProfile(@NonNull Long id);

    UserDTO updateProfile(@NonNull UserDTO userDTO);

    UserDTO getAuthenticatedUser(@NonNull HttpServletRequest request,
                                           @NonNull HttpServletResponse response);
}
