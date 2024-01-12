
package com.example.backend.services.classroom;

import com.example.backend.configurations.converter.ClassroomMapper;
import com.example.backend.configurations.converter.RoleMapper;
import com.example.backend.configurations.converter.UserMapper;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.*;
import com.example.backend.entities.*;
import com.example.backend.exceptions.ConflictException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.*;
import com.example.backend.services.email.IEmailService;
import com.example.backend.services.helper.Helper;
import com.example.backend.services.helper.StudentIdGenerator;
import com.example.backend.services.token.ITokenService;
import io.jsonwebtoken.Claims;
import jakarta.annotation.Nullable;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements IClassroomService {

    private final ClassroomRepository classRoomRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ClassUserRepository classUserRepository;
    private final InvitationUrlRepository invitationUrlRepository;
    private final IEmailService emailService;
    private final ITokenService tokenService;
    private final ClassroomMapper classRoomMapper;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final Helper helper;
    private final StudentIdGenerator studentIdGenerator;
    private final NonUserRepository nonUserRepository;

    private final int SHORT_IDENTIFIER_LENGTH = 6;


    @Override
    public ClassroomDTO createClassRoom(ClassroomDTO classRoomDTO) {

        Classroom classroom = classRoomMapper.toEntity(classRoomDTO);
        classroom.setCode(generateShortIdentifier(SHORT_IDENTIFIER_LENGTH));
        Classroom savedClassroom = classRoomRepository.save(classroom);

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Role role = roleRepository.findByName(RoleEnum.Owner.name()).orElseThrow(
                () -> new NotFoundException("Role not found")
        );
        ClassUser classUser =  ClassUser.builder()
                .userName(user.getLastName() + " " + user.getFirstName())
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

        ClassroomDTO classroomDTO = classRoomMapper.toDTO(savedClassroom);
        classroomDTO.setRole(roleMapper.toDTO(role));


        return classroomDTO;

    }


    @Override
    public Map<String, String> joinClassroomByCode(JoinClassByOTPRequestDTO body) {



            Classroom classRoom = classRoomRepository.findByCode(body.getCode()).orElseThrow(
                    () -> new NotFoundException("Classroom not found")
            );

            Role role = roleRepository.findByName(RoleEnum.Student.name()).orElseThrow(
                    () -> new NotFoundException("Role not found")
            );

            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (classUserRepository.existsByUserIdAndClassroomId(user.getId(), classRoom.getId())) {
                throw new ConflictException("User already joined this class");
            }

            ClassUser classUser = ClassUser.builder()
                    .userName(user.getLastName() + " " + user.getFirstName())
                    .classroom(classRoom)
                    .role(role)
                    .user(user)
                    .build();
            ClassUser savedData = classUserRepository.save(classUser);

            return Map.of("class_id", savedData.getClassroom().getId());

    }

    @Override
    public ClassroomDTO getClassRoom(String id) throws AccessDeniedException {

        Classroom classRoom = classRoomRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classRoom.getId())
                .orElseThrow(
                        () -> new AccessDeniedException("User is not in this class")
                );



        RoleDTO role  = roleMapper.toDTO(classUser.getRole());
        ClassroomDTO classroomDTO = classRoomMapper.toDTO(classRoom);
        classroomDTO.setRole(role);

        return classroomDTO;
    }

    @Override
    public ClassroomDTO updateClassRoom(String id, ClassroomDTO classRoomDTO) {

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
    public List<UsersOfClassroomDTO> getUsersOfClassroom(String id) throws AccessDeniedException {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!classUserRepository.existsByUserIdAndClassroomId(user.getId(), id)) {
            throw new AccessDeniedException("User is not in this class");
        }

        return getUsersOfClassroomDTOs(id, null);
    }

    @Override
    public Map<String, Object> sendInvitationEmail(InvitationEmailRequestDTO body) throws MessagingException {

        Classroom classRoom = classRoomRepository.findById(body.getClassroomId()).orElseThrow(
                () -> new NotFoundException("Classroom not found")
        );

        Role role = roleRepository.findByCode(body.getRoleCode()).orElseThrow(
                () -> new NotFoundException("Role not found")
        );

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        InvitationUrl savedInvitationUrl = invitationUrlRepository.save(
                InvitationUrl.builder()
                        .role(role)
                        .accessToken(tokenService.generateEmailToken(body.getReceiverEmail()))
                        .classroom(classRoom)
                        .build()
        );


        String accessToken = tokenService.generateEmailToken(body.getReceiverEmail());
        StringBuilder url = new StringBuilder(body.getRedirectUrl());
        url.append("?invitation_id=").append(savedInvitationUrl.getId());




        InvitationEmailDTO invitationEmailDTO = InvitationEmailDTO.builder()
                .role(role.getName())
                .senderEmail(user.getEmail())
                .senderName(user.getFirstName() + " " + user.getLastName())
                .className(classRoom.getName())
                .url(url.toString())
                .build();

        emailService.sendInvitationHtmlMessage(body.getReceiverEmail(), "Invitation to join classroom", invitationEmailDTO);




        return Map.of("url", url.toString());
    }

    @Override
    public Map<String, Object> joinClassroomByInvitationUrl(JoinClassByEmailRequestDTO body) {

        InvitationUrl invitationUrl = invitationUrlRepository.findById(body.getInvitationId()).orElseThrow(
                () -> new NotFoundException("Invitation not found")
        );

        String accessToken = invitationUrl.getAccessToken();

        String email = tokenService.extractClaim(accessToken, Claims::getSubject);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(tokenService.isExpiredToken(accessToken)) {
            throw new AccessDeniedException("Token is expired");
        }

        if(!user.getEmail().equals(email)) {
            throw new ConflictException("User is wrong");
        }

        Role role = invitationUrl.getRole();

        Classroom classRoom = invitationUrl.getClassroom();

        if(classUserRepository.existsByUserIdAndClassroomId(user.getId(), classRoom.getId())) {
            throw new ConflictException("User already joined this class");
        }



        ClassUser classUser = ClassUser.builder()
                .userName(user.getLastName() + " " + user.getFirstName())
                .classroom(classRoom)
                .role(role)
                .user(user)
                .build();

        return Map.of("classroom_id", classUserRepository.save(classUser).getClassroom().getId());
    }

    @Override
    public List<StudentsClassroomRequestDTO> getStudentsOfClassroom(String classroomId) throws AccessDeniedException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId)
                .orElseThrow(
                        () -> new AccessDeniedException("User is not in this class")
                );
        if(!classUser.getRole().getName().equals(RoleEnum.Teacher.name()) && !classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            throw new AccessDeniedException("User is not teacher or owner of this class");
        }
        List<StudentsClassroomRequestDTO> result = new ArrayList<>();
        getUsersOfClassroomDTOs(classroomId, RoleEnum.Student)
                .forEach(
                        usersOfClassroomDTO -> {
                            result.add(
                                    StudentsClassroomRequestDTO.builder()
                                            .studentId(usersOfClassroomDTO.getUser().getStudentId())
                                            .studentName(usersOfClassroomDTO.getUserName())
                                            .accountId(usersOfClassroomDTO.getUser().getId())
                                            .classroomId(classroomId)
                                            .build()
                            );
                        }
                );
        List<NonUser> nonUsers = nonUserRepository.findByClassroomId(classroomId);
        for(NonUser nonUser: nonUsers) {
            result.add(
                    StudentsClassroomRequestDTO.builder()
                            .studentId(nonUser.getStudentId())
                            .studentName(nonUser.getName())
                            .accountId(null)
                            .classroomId(classroomId)
                            .build()
            );

        }
        result.sort((o1, o2) -> {
            if(o1.getStudentId() == null) {
                return -1;
            }
            if(o2.getStudentId() == null) {
                return 1;
            }
            return o1.getStudentId().compareTo(o2.getStudentId());
        });




        return result;
    }

    @Override
    public StudentsClassroomRequestDTO mapStudentIdToAccount(String studentId, String accountId, String studentName, String classroomId) throws AccessDeniedException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId)
                .orElseThrow(
                        () -> new AccessDeniedException("User is not in this class")
                );
        if(!classUser.getRole().getName().equals(RoleEnum.Teacher.name()) && !classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            throw new AccessDeniedException("User is not teacher or owner of this class");
        }
        User student = userRepository.findById(accountId).orElseThrow(
                () -> new NotFoundException("Student not found")
        );
        ClassUser classStudent = classUserRepository.findByUserIdAndClassroomId(student.getId(), classUser.getClassroom().getId())
                .orElseThrow(
                        () -> new NotFoundException("Student is not in this class")
                );

        if(student.getStudentId() == null) {
            student.setStudentId(studentId);
            classStudent.setUserName(studentName.trim());
            classUserRepository.save(classStudent);
            userRepository.save(student);
        }

        return StudentsClassroomRequestDTO.builder()
                .studentId(student.getStudentId())
                .studentName(classStudent.getUserName())
                .accountId(student.getId())
                .classroomId(classUser.getClassroom().getId())
                .build();
    }

    @Override
    public StudentsClassroomRequestDTO saveNonUserToClassroom(String studentId, String studentName, String classroomId) throws AccessDeniedException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ClassUser classUser = classUserRepository.findByUserIdAndClassroomId(user.getId(), classroomId)
                .orElseThrow(
                        () -> new AccessDeniedException("User is not in this class")
                );
        if(!classUser.getRole().getName().equals(RoleEnum.Teacher.name()) && !classUser.getRole().getName().equals(RoleEnum.Owner.name())) {
            throw new AccessDeniedException("User is not teacher or owner of this class");
        }
        NonUser existedNonUser = nonUserRepository.findByStudentId(studentId).orElse(null);
        Map<String, Object> response = new HashMap<>();
        if(existedNonUser == null) {
            NonUser nonUser = NonUser.builder()
                    .name(studentName)
                    .studentId(studentId)
                    .classroom(classUser.getClassroom())
                    .build();
            nonUserRepository.save(nonUser);
            response.put("student_id", nonUser.getStudentId());
            response.put("student_name", nonUser.getName());

        } else {
            response.put("student_id", existedNonUser.getStudentId());
            response.put("student_name", existedNonUser.getName());
        }
        response.put("account_id", null);
        return StudentsClassroomRequestDTO.builder()
                .studentName(response.get("student_name").toString())
                .studentId(response.get("student_id").toString())
                .accountId(null)
                .classroomId(classUser.getClassroom().getId())
                .build();

    }

    private List<UsersOfClassroomDTO> getUsersOfClassroomDTOs(String classroomId, @Nullable RoleEnum roleEnum) {
        if(roleEnum == null) {
            return classUserRepository.findByClassroomId(classroomId).stream().map(
                    classUser -> {
                        Role role = classUser.getRole();
                        User _user = classUser.getUser();
                        return UsersOfClassroomDTO.builder()
                                .userName(classUser.getUserName())
                                .role(roleMapper.toDTO(role))
                                .user(userMapper.toDTO(_user))
                                .build();
                    }
            ).toList();
        }
        return classUserRepository
                .findByClassroomIdAndRoleName(classroomId, roleEnum.name())
                .stream()
                .map(
                classUser -> {
                    Role role = classUser.getRole();
                    User _user = classUser.getUser();
                    return UsersOfClassroomDTO.builder()
                            .userName(classUser.getUserName())
                            .role(roleMapper.toDTO(role))
                            .user(userMapper.toDTO(_user))
                            .build();
                }
        ).toList();
    }

    // Helper method to split the query parameters into a map
    // Helper method to extract query parameters from URI
    private static Map<String, List<String>> getQueryParameters(URI uri) {
        String query = uri.getQuery();
        if (query != null) {
            return Arrays.stream(query.split("&"))
                    .map(param -> param.split("="))
                    .collect(Collectors.groupingBy(
                            param -> param[0],
                            Collectors.mapping(param -> param.length > 1 ? param[1] : null, Collectors.toList())
                    ));
        }
        return new HashMap<>();
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