package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.classroom.IClassroomService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/classrooms")
@RequiredArgsConstructor
public class ClassroomController {

    private final IClassroomService classroomService;

    @PostMapping("/create")
    public ResponseEntity<ClassroomDTO> createClassRoom(@RequestBody ClassroomDTO classRoomDTO) {
        return ResponseEntity.ok(
                classroomService.createClassRoom(classRoomDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomDTO> getClassRoom(@PathVariable String id) throws AccessDeniedException {



        return ResponseEntity.ok(classroomService.getClassRoom(id));
    }

    @PostMapping("/join/code")
    public ResponseEntity<Map<String, String>> joinClassRoom(@RequestBody JoinClassByOTPRequestDTO body) {
        return ResponseEntity.ok(
                classroomService.joinClassroomByCode(body)
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ClassroomDTO> updateClassRoom(@PathVariable String id, @RequestBody ClassroomDTO classRoomDTO) throws AccessDeniedException {
        return ResponseEntity.ok(
                classroomService.updateClassRoom(id, classRoomDTO)
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<UsersOfClassroomDTO>> getUsersOfClassroom(@PathVariable String id) throws AccessDeniedException {
        return ResponseEntity.ok(
                classroomService.getUsersOfClassroom(id)
        );
    }

    @PostMapping("/invite")
    public ResponseEntity<Map<String, Object>> inviteUserToClassroom(@RequestBody InvitationEmailRequestDTO body) throws MessagingException {
        return ResponseEntity.ok(
                classroomService.sendInvitationEmail(body)
        );
    }

    @PostMapping("/join/email")
    public ResponseEntity<Map<String, Object>> joinClassroomByInvitationUrl(@RequestBody Map<String, String> body) {
        System.out.println(body.get("invitation_id"));

        return ResponseEntity.ok(
                classroomService.joinClassroomByInvitationUrl(JoinClassByEmailRequestDTO.builder()
                        .invitationId(body.get("invitation_id"))
                        .build()
                )
        );
    }

    @GetMapping("/students/{classroomId}")
    public ResponseEntity<List<UsersOfClassroomDTO>> getStudentsOfClassroom(@PathVariable String classroomId) throws AccessDeniedException {
        return ResponseEntity.ok(
                classroomService.getStudentsOfClassroom(classroomId)
        );
    }

    @PostMapping("/student-id/mapping")
    public ResponseEntity<List> mapStudentIdToAccount(@RequestBody List<StudentsClassroomRequestDTO> body) throws AccessDeniedException {
       List<StudentsClassroomRequestDTO> response = new ArrayList<>();
        for(StudentsClassroomRequestDTO dto : body) {
           if(dto.getAccountId() == null) {

                       response.add(classroomService.saveNonUserToClassroom(dto.getStudentId(), dto.getStudentName(), dto.getClassroomId()));

           } else {
                response.add(classroomService.mapStudentIdToAccount(dto.getStudentId(), dto.getAccountId(), dto.getStudentName(), dto.getClassroomId()));
           }
        }


        return ResponseEntity.ok(
                response
        );
    }

}
