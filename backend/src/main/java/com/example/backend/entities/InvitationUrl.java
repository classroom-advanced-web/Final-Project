package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "invitation_urls")
@Where(clause = "revoked = false")
public class InvitationUrl {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "invitation_url_id")
    private String id;

    @Column(name = "access_token")
    private String accessToken;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classroom classroom;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;



}
