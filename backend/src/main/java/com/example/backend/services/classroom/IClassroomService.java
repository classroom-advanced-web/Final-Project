package com.example.backend.services.classroom;

import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.JoinClassRequestDTO;

import java.util.Map;

public interface IClassroomService {

    ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO);

    Map<String, Long> joinClassRoom(JoinClassRequestDTO body);

    ClassroomDTO getClassRoom(Long id);

}
