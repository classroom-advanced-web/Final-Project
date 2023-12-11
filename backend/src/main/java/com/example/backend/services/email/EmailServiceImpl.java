package com.example.backend.services.email;

import com.example.backend.dtos.InvitationEmailDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.context.ApplicationContext;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ITemplateResolver;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService {

    private final JavaMailSender emailSender;
    private final ApplicationContext applicationContext;

    @Async
    public void sendSimpleMessage(
            String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("no-reply@example.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);

    }

    @Async
    public void sendOTPHtmlMessage(String to, String subject, String OTP) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlBody = getOTPHtmlContent(OTP);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true); // Set the second parameter to true for HTML content

        emailSender.send(message);
    }


    public void sendInvitationHtmlMessage(String to, String subject, InvitationEmailDTO invitationEmailDTO) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlBody = getInvitationHtmlContent(invitationEmailDTO);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true); // Set the second parameter to true for HTML content

        emailSender.send(message);
    }

    private String getInvitationHtmlContent(InvitationEmailDTO invitationEmailDTO) {
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver((ITemplateResolver) applicationContext.getBean("templateResolver"));

        Context context = new Context();
        context.setVariable("url", invitationEmailDTO.getUrl());
        context.setVariable("role", invitationEmailDTO.getRole());
        context.setVariable("className", invitationEmailDTO.getClassName());
        context.setVariable("senderName", invitationEmailDTO.getSenderName());
        context.setVariable("senderEmail", invitationEmailDTO.getSenderEmail());

        return templateEngine.process("email-invitation-template", context);
    }

    private String getOTPHtmlContent(String OTP) {
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver((ITemplateResolver) applicationContext.getBean("templateResolver"));

        Context context = new Context();
        context.setVariable("OTP", OTP);
//        context.setVariable("lastName", lastName);

        return templateEngine.process("email-otp-template", context);
    }
}
