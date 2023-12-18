package com.example.backend.services.token;

import io.jsonwebtoken.Claims;
import lombok.NonNull;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.function.Function;



public interface ITokenService {

    String extractUserId(String jwt);

    <T> T extractClaim(String token, Function<Claims, T> claimResolver);

    boolean isValidToken(@NonNull String token, @NonNull UserDetails userDetails);

    boolean isExpiredToken(@NonNull String token);

    String generateToken(
            @NonNull Map<String, Object> extraClaims,
            @NonNull UserDetails userDetails
    );

    String generateToken(
            @NonNull UserDetails userDetails
    );

    String generateRefreshToken(
            @NonNull UserDetails userDetails
    );

    String generateEmailToken(String email);
}
