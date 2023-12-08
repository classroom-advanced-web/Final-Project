package com.example.backend.services.user;

import com.example.backend.configurations.converter.Mapper;
import com.example.backend.constants.AppConstant;
import com.example.backend.constants.GenderEnum;
import com.example.backend.constants.RoleEnum;
import com.example.backend.dtos.*;
import com.example.backend.entities.OTP;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AuthenticationErrorException;
import com.example.backend.exceptions.ConflictException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.OTPRepository;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.email.IEmailService;
import com.example.backend.services.google.IGoogleService;
import com.example.backend.services.otp.IOTPService;
import com.example.backend.services.token.ITokenService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OTPRepository otpRepository;
    private final ITokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final IGoogleService googleService;
    private final IOTPService otpService;
    private final IEmailService emailService;

    private final Mapper<User, UserDTO> userMapper;

    @Override
    public AuthenticationResponseDTO login(@NonNull LoginDTO loginDTO) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );

        } catch (Exception e) {
            throw  new AuthenticationErrorException("Username or Password is incorrect");
        }

        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(
                () -> new NotFoundException("User not found")
        );

            String accessToken = tokenService.generateToken(user);
            String refreshToken = tokenService.generateRefreshToken(user);

            return AuthenticationResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
    }

    @Override
    public AuthenticationResponseDTO register(@NonNull RegisterDTO newUserDTO) {


        User existedUser = userRepository.findByEmail(newUserDTO.getEmail()).orElse(null);

        if(existedUser != null) {
            throw new ConflictException("Email have already existed");
        }



        try {


            User user = User.builder()
                    .email(newUserDTO.getEmail())
                    .password(passwordEncoder.encode(newUserDTO.getPassword()))
                    .firstName(newUserDTO.getFirstName())
                    .lastName(newUserDTO.getLastName())
                    .gender(newUserDTO.getGender() == null ? GenderEnum.UNKNOWN.name() : newUserDTO.getGender().name())
                    .DOB(newUserDTO.getDOB())
                    .build();

            User savedUser = userRepository.save(user);
            String accessToken = tokenService.generateToken(savedUser);
            String refreshToken = tokenService.generateRefreshToken(savedUser);

            return AuthenticationResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();


        } catch (Exception e) {
            throw new AuthenticationErrorException("Register failed");
        }
    }

    @Override
    public AuthenticationResponseDTO refreshToken(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(AppConstant.TOKEN_PREFIX)) {
            throw new AuthenticationErrorException("Invalid token");
        }
        String token = authHeader.substring(AppConstant.TOKEN_PREFIX.length());
        Long userID = tokenService.extractUserId(token);
        if (userID != null ) {
            User user = userRepository.findById(userID).orElse(null);
            if (user != null && tokenService.isValidToken(token, user)) {
                String accessToken = tokenService.generateToken(user);
                return AuthenticationResponseDTO.builder()
                        .accessToken(accessToken)
                        .refreshToken(token)
                        .build();

            }
        }
        throw new AuthenticationErrorException("Invalid token");
    }

    @Override
    public UserDTO getProfile(@NonNull Long id) {

        User user = userRepository.findById(id).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        return userMapper.toDTO(user);


    }

    @Override
    public UserDTO updateProfile(@NonNull UserDTO userDTO) {

        Optional<User> optionalUser = userRepository.findById(userDTO.getId());


        return optionalUser.map(existingUser -> {
            // Use BeanUtils to copy non-null properties from DTO to entity
            BeanUtils.copyProperties(userDTO, existingUser, getNullPropertyNames(userDTO));
            existingUser.setGender(userDTO.getGender() == null ? "UNKNOWN" : userDTO.getGender().name());

            // Save the updated user
            return userMapper.toDTO(userRepository.save(existingUser));
        }).orElseThrow(() -> new RuntimeException("User not found"));



//        user.setEmail(userDTO.getEmail() );
//        user.setFirstName(userDTO.getFirstName());
//        user.setLastName(userDTO.getLastName());
//        user.setGender(userDTO.getGender().name());
//        user.setDOB(userDTO.getDOB());
//        userRepository.save(user);

//        return userDTO;
    }

    @Override
    public UserDTO getAuthenticatedUser(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(AppConstant.TOKEN_PREFIX)) {
            throw new AuthenticationErrorException("Invalid token");
        }
        String token = authHeader.substring(AppConstant.TOKEN_PREFIX.length());
        Long userID = tokenService.extractUserId(token);
        if (userID != null ) {
            User user = userRepository.findById(userID).orElse(null);
            if (user != null && tokenService.isValidToken(token, user)) {
                return userMapper.toDTO(user);

            }
        }
        throw new AuthenticationErrorException("Invalid token");
    }

    @Override
    public AuthenticationResponseDTO authenticateWithGoogle(@NonNull AccessTokenDTO token) {
        User user = googleService.getUserInfo(token.getAccessToken());

        if(user == null) {
            throw new AuthenticationErrorException("Invalid Token");
        }

        User existedUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        if(existedUser == null) {
            user.setGender(GenderEnum.UNKNOWN.name());


            User savedUser = userRepository.save(user);
            return AuthenticationResponseDTO.builder()
                    .accessToken(tokenService.generateToken(savedUser))
                    .refreshToken(tokenService.generateRefreshToken(savedUser))
                    .build();
        }

        return AuthenticationResponseDTO.builder()
                .accessToken(tokenService.generateToken(existedUser))
                .refreshToken(tokenService.generateRefreshToken(existedUser))
                .build();

    }

    @Override
    public Map<String, Object> sendOTP(String email) throws MessagingException {

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new NotFoundException("Email does not exists")
        );

        String otpString = otpService.generateOTP();

        emailService.sendHtmlMessage(email, "OTP", otpString);

        OTP savedOTP = otpRepository.save(
                OTP.builder()
                        .value(otpString)
                        .expiredDate(OTP.calculateExpiration())
                        .build()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("otp_id", savedOTP.getId());
        response.put("access_token", tokenService.generateEmailToken(email));


        return response;
    }

    @Override
    public Map<String, String> verifyOTP(Long otpID, String otpStr) {


        OTP foundOTP = otpRepository.findById(otpID).orElseThrow(
                () -> new NotFoundException("OTP wrong")
        );



        LocalDateTime now = LocalDateTime.now();
        if(otpStr.equals(foundOTP.getValue()) &&
                Timestamp.valueOf(now).before(foundOTP.getExpiredDate()) &&
                !foundOTP.isRevoked()) {
            Map<String, String> response = new HashMap<>();
            foundOTP.setRevoked(true);
            otpRepository.save(foundOTP);
            response.put("message", "Success");
            return response;
        }
        return null;

    }

    @Override
    public Map<String, String> renewPassword(String email, String password) {

        User foundUser = userRepository.findByEmail(email).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        foundUser.setPassword(passwordEncoder.encode(password));
        User updatedUser = userRepository.save(foundUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");
        return response;
    }

    @Override
    public Map<String, String> verifyEmail(String email) {

        User foundUser = userRepository.findByEmail(email).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        foundUser.setActivated(true);
        userRepository.save(foundUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");

        return response;
    }

    // Helper method to get null property names from an object
    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }

        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
