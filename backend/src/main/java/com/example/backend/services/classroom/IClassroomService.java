package com.example.backend.services.classroom;

import com.example.backend.dtos.*;
import jakarta.mail.MessagingException;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Map;

public interface IClassroomService {

    ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO);

    Map<String, Long> joinClassroomByCode(JoinClassByOTPRequestDTO body);

    ClassroomDTO getClassRoom(Long id) throws AccessDeniedException;

    ClassroomDTO updateClassRoom(Long id, ClassroomDTO classRoomDTO) throws AccessDeniedException;

    List<UsersOfClassroomDTO> getUsersOfClassroom(Long id) throws AccessDeniedException;

    Map<String, Object> sendInvitationEmail(InvitationEmailRequestDTO body) throws MessagingException;

    Map<String, Object> joinClassroomByInvitationUrl(JoinClassByEmailRequestDTO body);

}
