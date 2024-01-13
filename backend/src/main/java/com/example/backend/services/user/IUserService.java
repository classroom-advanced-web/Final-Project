package com.example.backend.services.user;

import com.example.backend.dtos.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;

import java.util.List;
import java.util.Map;

public interface IUserService {

    AuthenticationResponseDTO login(@NonNull LoginDTO loginDTO);

    AuthenticationResponseDTO register(@NonNull RegisterDTO newUserDTO);
    AuthenticationResponseDTO refreshToken(@NonNull HttpServletRequest request,
                                           @NonNull HttpServletResponse response);

    UserDTO getProfile(@NonNull String id);

    UserDTO updateProfile(@NonNull UserDTO userDTO);

    UserDTO getAuthenticatedUser(@NonNull HttpServletRequest request,
                                           @NonNull HttpServletResponse response);

    AuthenticationResponseDTO authenticateWithGoogle(@NonNull AccessTokenDTO token);

    Map<String, Object> sendOTP(String email) throws MessagingException;

    Map<String, String> verifyOTP(String otpID, String otpStr);

    Map<String, String> renewPassword(String email, String password);
    Map<String, String> verifyEmail(String email);

    List<ClassroomsOfUserDTO> getClassrooms();

    List<UserDTO> getAllUsers();

    String changeRevokeStatusOfUser(String userId, Boolean status);

    String changeRevokeStatusOfClassroom(String classroomId, Boolean status);

    List<ClassroomDTO> getAllClassrooms();


}
