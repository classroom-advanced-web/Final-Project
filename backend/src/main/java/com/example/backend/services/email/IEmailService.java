package com.example.backend.services.email;

import jakarta.mail.MessagingException;

public interface IEmailService {

    void sendSimpleMessage(String to, String subject, String text);
    void sendHtmlMessage(String to, String subject, String OTP) throws MessagingException;

}
