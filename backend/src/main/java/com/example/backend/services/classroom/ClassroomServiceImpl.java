package com.example.backend.services.classroom;

import com.example.backend.configurations.converter.ClassroomMapper;
import com.example.backend.configurations.converter.RoleMapper;
import com.example.backend.configurations.converter.UserMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.ClassroomDTO;
import com.example.backend.dtos.JoinClassRequestDTO;
import com.example.backend.dtos.UsersOfClassroomDTO;
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
import com.example.backend.services.helper.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements IClassroomService {

    private final ClassroomRepository classRoomRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ClassUserRepository classUserRepository;
    private final ClassroomMapper classRoomMapper;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final Helper helper;

    private final int SHORT_IDENTIFIER_LENGTH = 6;


    @Override
    public ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO) {

        Classroom classRoom = classRoomMapper.toEntity(classRoomDTO);
        classRoom.setCode(generateShortIdentifier(SHORT_IDENTIFIER_LENGTH));
        Classroom savedClassroom = classRoomRepository.save(classRoom);

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Role role = roleRepository.findByName(RoleEnum.Owner.name()).orElseThrow(
                () -> new NotFoundException("Role not found")
        );
        ClassUser classUser =  ClassUser.builder()
                .classroom(savedClassroom)
                .role(role)
                .user(user)
                .build();

        try {
            classUserRepository.save(
                    classUser
            );
        } catch (Exception e) {
            throw  new ConflictException(e.getMessage());
        }



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

    @Override
    public ClassroomDTO updateClassRoom(Long id, ClassroomDTO classRoomDTO) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Classroom classRoom = classRoomRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classRoom.getId()).orElse(null);
        if(classUser == null ||
                !classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            throw new AccessDeniedException("User is not owner of this class");
        }


        Set<String> ignoreProperties = helper.getNullPropertyNames(classRoomDTO);
        ignoreProperties.add("id");
        ignoreProperties.add("code");
        BeanUtils.copyProperties(classRoomDTO, classRoom, ignoreProperties.toArray(new String[0]));
        Classroom savedClassroom = classRoomRepository.save(classRoom);

        return classRoomMapper.toDTO(savedClassroom);
    }

    @Override
    public List<UsersOfClassroomDTO> getUsersOfClassroom(Long id) throws AccessDeniedException {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!classUserRepository.existsByUserIdAndClassroomId(user.getId(), id)) {
            throw new AccessDeniedException("User is not in this class");
        }

        return classUserRepository.findByClassroomId(id).stream().map(
                classUser -> {
                   Role role = roleRepository.findById(classUser.getRole().getId()).orElseThrow(
                           () -> new NotFoundException("Role not found")
                     );
                   User _user = userRepository.findById(classUser.getUser().getId()).orElseThrow(
                           () -> new NotFoundException("User not found")
                     );
                    return UsersOfClassroomDTO.builder()
                            .role(roleMapper.toDTO(role))
                            .user(userMapper.toDTO(_user))
                           .build();
                }
        ).toList();
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
