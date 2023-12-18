package com.example.backend.dtos;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class InvitationEmailDTO {

    String url;
    String role;
    String className;
    String senderName;
    String senderEmail;
}
