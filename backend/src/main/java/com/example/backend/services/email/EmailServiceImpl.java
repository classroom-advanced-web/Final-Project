package com.example.backend.services.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.context.ApplicationContext;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
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
    public void sendHtmlMessage(String to, String subject, String OTP) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlBody = getHtmlContent(OTP);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true); // Set the second parameter to true for HTML content

        emailSender.send(message);
    }

    private String getHtmlContent(String OTP) {
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver((ITemplateResolver) applicationContext.getBean("templateResolver"));

        Context context = new Context();
        context.setVariable("OTP", OTP);
//        context.setVariable("lastName", lastName);

        return templateEngine.process("email-template", context);
    }
}
