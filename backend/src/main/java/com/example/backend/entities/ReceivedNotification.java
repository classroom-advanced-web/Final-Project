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
@Table(name = "received_notifications")
@Where(clause = "revoked = false")
public class ReceivedNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "received_notification_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "user_id" ,nullable = false)
    private User receiver;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;
}
