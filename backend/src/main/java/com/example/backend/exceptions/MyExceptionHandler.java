package com.example.backend.exceptions;

import com.example.backend.dtos.ErrorResponseDTO;
import io.jsonwebtoken.security.SignatureException;
import jakarta.mail.MessagingException;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponseDTO> resolveException(NotFoundException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(exception.getMessage())
                .build(),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationErrorException.class)
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorResponseDTO> resolveException(AuthenticationErrorException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(exception.getMessage())
                        .build(),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(code = HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseDTO> resolveException(ConflictException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(exception.getMessage())
                        .build(),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AlreadyReportedException.class)
    @ResponseStatus(code = HttpStatus.ALREADY_REPORTED)
    public ResponseEntity<Map> resolveException(AlreadyReportedException exception, Object payload) {
        Map<String, Object> response = new HashMap<>();
        return new ResponseEntity<>(
                response
                ,
                HttpStatus.ALREADY_REPORTED);
    }



    /*---------------------- System exception ---------------------------*/
    @ExceptionHandler(SQLException.class)
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseDTO> resolveException(SQLException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(exception.getMessage())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorResponseDTO> resolveException(AccessDeniedException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(exception.getMessage())
                        .build(),

                HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> resolveException(HttpMessageNotReadableException exception) {
        String errorMessage = "Malformed JSON request. Please check the request body.";
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(errorMessage)
                        .build(),
                 HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MessagingException.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseDTO> resolveException(MessagingException exception) {
        String errorMessage = "Malformed JSON request. Please check the request body.";
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(errorMessage)
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({NumberFormatException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> resolveException(NumberFormatException exception) {
        String errorMessage = "Malformed JSON request. Please check the request body.";
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(errorMessage)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorResponseDTO> resolveException(SignatureException exception) {
        String errorMessage = "Invalid token. Please check the token.";
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error(errorMessage)
                        .build(),
                HttpStatus.UNAUTHORIZED);
    }
}
