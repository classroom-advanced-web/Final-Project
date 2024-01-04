package com.example.backend.services.helper;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StudentIdGenerator {
    private static final int STUDENT_ID_LENGTH = 10;
    private static final String STUDENT_ID_PREFIX = "S";
    private static final String CLASS_CODE_PREFIX = "C";

    public static String generateStudentId(String classCode, UUID userId) {
        // Ensure class code is not null and has a valid format
        if (classCode == null || classCode.isEmpty()) {
            throw new IllegalArgumentException("Class code cannot be null or empty");
        }

        // Ensure userId is not null
        if (userId == null) {
            throw new IllegalArgumentException("UserId cannot be null");
        }

        // Get the first two letters of the class code
        String classCodePrefix = classCode.substring(0, Math.min(classCode.length(), 4)).toUpperCase();

        // Get the last six digits of the UUID
        String uuidString = userId.toString();
        String uuidSuffix = uuidString.substring(uuidString.length() - 6);

        // Combine class code prefix and UUID suffix
//        String studentId = CLASS_CODE_PREFIX + classCodePrefix + STUDENT_ID_PREFIX + uuidSuffix;
        String studentId = classCodePrefix + uuidSuffix;
        // Ensure the resulting string has exactly 8 characters
        return truncateOrPad(studentId.toUpperCase(), STUDENT_ID_LENGTH);
    }

    private static String truncateOrPad(String input, int length) {
        if (input.length() == length) {
            return input;
        } else if (input.length() < length) {
            // Pad with zeros if the length is less than required
            return String.format("%-" + length + "s", input).replace(' ', '0');
        } else {
            // Truncate if the length is more than required
            return input.substring(0, length);
        }
    }

    public static void main(String[] args) {
        // Example usage with UUID
        String classCode = "da101";
        UUID userId = UUID.randomUUID();

        String studentId = generateStudentId(classCode, userId);
        System.out.println("Generated Student ID: " + studentId);
    }
}
