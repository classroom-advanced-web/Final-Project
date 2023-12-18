package com.example.backend.services.email;

import com.example.backend.dtos.InvitationEmailDTO;
import jakarta.mail.MessagingException;

public interface IEmailService {

    void sendSimpleMessage(String to, String subject, String text);
    void sendOTPHtmlMessage(String to, String subject, String OTP) throws MessagingException;

    void sendInvitationHtmlMessage(String to, String subject, InvitationEmailDTO invitationEmailDTO) throws MessagingException;

}
