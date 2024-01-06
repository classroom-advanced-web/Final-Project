package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.api.client.util.DateTime;
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
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "notifications")
@Where(clause = "revoked = false")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "notification_id")
    private String id;

    @Column(name = "notification_content", nullable = false)
    private String content;

    private String title;

    @Column(name = "is_read")
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "notification_sender_id", referencedColumnName = "class_user_id" ,nullable = false)
    private ClassUser sender;

    @OneToMany(mappedBy = "notification")
    @JsonIgnore
    private List<ReceivedNotification> receivedNotification;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;

}
