package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
