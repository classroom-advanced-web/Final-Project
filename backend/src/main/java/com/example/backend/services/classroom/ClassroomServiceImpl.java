package com.example.backend.services.classroom;

import com.example.backend.configurations.converter.ClassroomMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.JoinClassRequestDTO;
import com.example.backend.entities.Classroom;
import com.example.backend.entities.ClassUser;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.exceptions.ConflictException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.ClassroomRepository;
import com.example.backend.repositories.ClassUserRepository;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.channels.AcceptPendingException;
import java.nio.file.AccessDeniedException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements IClassroomService {

    private final ClassroomRepository classRoomRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ClassUserRepository classUserRepository;
    private final ClassroomMapper classRoomMapper;

    private final int SHORT_IDENTIFIER_LENGTH = 6;


    @Override
    public ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO) {

        Classroom classRoom = classRoomMapper.toEntity(classRoomDTO);
        classRoom.setCode(generateShortIdentifier(SHORT_IDENTIFIER_LENGTH));
        Classroom savedClassroom = classRoomRepository.save(classRoom);

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        classUserRepository.save(
                ClassUser.builder()
                .classroom(savedClassroom)
                .role(roleRepository.findByName(RoleEnum.Owner.name()).orElseThrow(
                        () -> new NotFoundException("Role not found")
                ))
                .user(user)
                .build()
        );

        return classRoomMapper.toDTO(savedClassroom);

    }

    @Override
    public Map<String, Long> joinClassRoom(JoinClassRequestDTO body) {

        Classroom classRoom = classRoomRepository.findByCode(body.getCode()).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        Role role = roleRepository.findById(body.getRoleId()).orElseThrow(
                () -> new NotFoundException("Role not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(classUserRepository.existsByUserIdAndClassroomId(user.getId(), classRoom.getId())) {
            throw new ConflictException("User already joined this class");
        }

        ClassUser classUser = ClassUser.builder()
                .classroom(classRoom)
                .role(role)
                .user(user)
                .build();
        ClassUser savedData = classUserRepository.save(classUser);


        return Map.of("class_id", savedData.getClassroom().getId());
    }

    @Override
    public ClassroomDTO getClassRoom(Long id) throws AccessDeniedException {

        Classroom classRoom = classRoomRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!classUserRepository.existsByUserIdAndClassroomId(user.getId(), classRoom.getId())) {
            throw new AccessDeniedException("User is not in this class");
        }

        return classRoomMapper.toDTO(classRoom);
    }


    private static String generateShortIdentifier(int length) {
        SecureRandom random = new SecureRandom();
        byte[] randomBytes = new byte[length];

        random.nextBytes(randomBytes);

        // Encode the random bytes to a URL-safe Base64 string
        String base64 = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        // Remove all non-alphanumeric characters
        String alphanumericIdentifier = base64.replaceAll("[^A-Za-z0-9]", "");

        // Trim or adjust the length if needed
        return alphanumericIdentifier.substring(0, Math.min(alphanumericIdentifier.length(), length));
    }

}
