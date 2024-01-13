package com.example.backend.constants;

public class AppConstant {

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHENTICATION_PATH = "/auth/**";
    public static final String USER_PATH = "/users/**";

    public static final String CLASSROOM_PATH = "/classrooms/**";

    public static final String GRADE_COMPOSITION_PATH = "/grade-composition/**";

    public static final String GRADE_PATH = "/grades/**";

    public static final String NOTIFICATION_PATH = "/notifications/**";

    public static final String COMMENT_PATH = "/comments/**";


    public static final int OTP_DIGITS = 6;
    public static final int OTP_PERIOD = 5 * 60; // Time period in seconds
    public static final String OTP_ALGORITHM = "HmacSHA1"; // You can also use HmacSHA256 or HmacSHA512



}
