package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.user.IUserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody RegisterDTO newUserDTO) {
        return ResponseEntity.ok(userService.register(newUserDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(userService.login(loginDTO));
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponseDTO> refreshToken(HttpServletRequest request,
                                                  HttpServletResponse response) {
        return ResponseEntity.ok(userService.refreshToken(request, response));
    }

    @GetMapping("/authenticated")
    public ResponseEntity<UserDTO> getAuthenticatedUser(HttpServletRequest request,
                                                        HttpServletResponse response) {
        return ResponseEntity.ok(userService.getAuthenticatedUser(request, response));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthenticationResponseDTO> authenticateWithGoogle(@RequestBody AccessTokenDTO token) {
        return ResponseEntity.ok(
                userService.authenticateWithGoogle(token)
        );
    }

    @PostMapping("/otp/send")
    public ResponseEntity<Map<String, Long>> sendOTP(@RequestBody Map<String, String> data) throws MessagingException {
        String email = data.get("email");
        return ResponseEntity.ok(
                userService.sendOTP(email)
        );

    }

    @PostMapping("/otp/verify")
    public ResponseEntity<Map<String, String>> verifyOTP(@RequestBody Map<String, String> data) {
        String otpString = data.get("otp_value");
        Long otpID = Long.valueOf(data.get("otp_id"));
        Map<String, String> response = userService.verifyOTP(otpID, otpString);
        if(response == null) {
            response = new HashMap<>();
            response.put("message", "Invalid OTP");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    response
            );
        }
        return ResponseEntity.ok(response);
    }

}
