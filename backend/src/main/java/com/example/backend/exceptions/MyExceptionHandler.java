package com.example.backend.exceptions;

import com.example.backend.dtos.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorResponseDTO> resolveException(AccessDeniedException exception) {
        return new ResponseEntity<>(
                ErrorResponseDTO.builder()
                        .error("You are not authorized")
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
}
