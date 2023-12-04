package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.token.ITokenService;
import com.example.backend.services.user.IUserService;
import io.jsonwebtoken.Claims;
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
    private final ITokenService tokenService;

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
    public ResponseEntity<Map<String, Object>> sendOTP(@RequestBody Map<String, String> data) throws MessagingException {
        String email = data.get("email");
        return ResponseEntity.ok(
                userService.sendOTP(email)
        );

    }

    @PostMapping("/otp/verify")
    public ResponseEntity<Map<String, String>> verifyOTP(@RequestBody Map<String, String> data,
                                                         @RequestParam("access_token") String accessToken) {
        String otpString = data.get("otp_value");
        Long otpID = Long.valueOf(data.get("otp_id"));
        String email = data.get("email");
        String extractedEmail = tokenService.extractClaim(accessToken, Claims::getSubject);

        Map<String, String> response = null;

        if(!email.equals(extractedEmail) || tokenService.isExpiredToken(accessToken)) {
            response = new HashMap<>();
            response.put("error", "Invalid Token");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    response
            );
        }
        response = userService.verifyOTP(otpID, otpString);
        if(response == null) {
            response = new HashMap<>();
            response.put("error", "Invalid OTP");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    response
            );
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password/renew")
    public ResponseEntity<Map<String, String>> renewPassword(@RequestBody Map<String, String> data,
                                                             @RequestParam("access_token") String accessToken) {
        String email = data.get("email");
        String password = data.get("password");
        String extractedEmail = tokenService.extractClaim(accessToken, Claims::getSubject);

        Map<String, String> response = null;
        if(!email.equals(extractedEmail) || tokenService.isExpiredToken(accessToken)) {
            response = new HashMap<>();
            response.put("error", "Invalid Token");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    response
            );
        }
        return ResponseEntity.ok(
                userService.renewPassword(email, password)
        );
    }

}
