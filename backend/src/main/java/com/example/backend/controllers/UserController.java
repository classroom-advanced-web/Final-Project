package com.example.backend.controllers;

import com.example.backend.dtos.ClassroomsOfUserDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getProfile(@PathVariable String id) {
        return ResponseEntity.ok(userService.getProfile(id));
    }

    @PutMapping("")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateProfile(userDTO));
    }


    @GetMapping("/classrooms")
    public ResponseEntity<List<ClassroomsOfUserDTO>> getClassrooms() {
        return ResponseEntity.ok(userService.getClassrooms());
    }

    @GetMapping("admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("admin/users/{userId}")
    public ResponseEntity<String> changeRevokeStatusOfUser(@PathVariable String userId, @RequestParam Boolean status) {
        return ResponseEntity.ok(userService.changeRevokeStatusOfUser(userId, status));
    }

    @PutMapping("admin/classrooms/{classroomId}")
    public ResponseEntity<String> changeRevokeStatusOfClassroom(@PathVariable String classroomId, @RequestParam Boolean status) {
        return ResponseEntity.ok(userService.changeRevokeStatusOfClassroom(classroomId, status));
    }

}
