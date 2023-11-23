package com.example.backend.components;

import com.example.backend.constants.AppConstant;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AuthenticationErrorException;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.token.ITokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final ITokenService tokenService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().equals(AppConstant.AUTHENTICATION_PATH)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {



            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith(AppConstant.TOKEN_PREFIX)) {
                filterChain.doFilter(request, response);
                return;
            }
            String token = authHeader.substring(AppConstant.TOKEN_PREFIX.length());
            Long userID = tokenService.extractUserId(token);
            if (userID != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userRepository.findById(userID).orElse(null);
                if (user != null && tokenService.isValidToken(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            user.getAuthorities()
                    );
//                    System.out.println("Author: " + authToken.getAuthorities());
                    authToken.setDetails(
                            new WebAuthenticationDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getOutputStream().println("{ \"error\": \"" + e.getMessage() + "\" }");
        }
    }
}
