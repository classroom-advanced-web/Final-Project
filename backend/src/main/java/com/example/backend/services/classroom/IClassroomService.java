package com.example.backend.services.classroom;

import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.JoinClassRequestDTO;
import com.example.backend.dtos.UsersOfClassroomDTO;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Map;

public interface IClassroomService {

    ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO);

    Map<String, Long> joinClassRoom(JoinClassRequestDTO body);

    ClassroomDTO getClassRoom(Long id) throws AccessDeniedException;

    ClassroomDTO updateClassRoom(Long id, ClassroomDTO classRoomDTO) throws AccessDeniedException;

    List<UsersOfClassroomDTO> getUsersOfClassroom(Long id) throws AccessDeniedException;

}
