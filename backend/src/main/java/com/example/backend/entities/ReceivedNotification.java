package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
}
