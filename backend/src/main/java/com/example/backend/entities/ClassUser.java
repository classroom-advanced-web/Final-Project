package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "users_in_classroom",
uniqueConstraints = {
        @UniqueConstraint(columnNames = {"class_id", "user_id"})
}

)
@Where(clause = "revoked = false")
public class ClassUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "class_user_id")
    private String id;

    @Column(name = "user_name")
    private String userName;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Classroom classroom;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "classUser")
    @JsonIgnore
    private List<Grade> grades;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Notification> notifications;

    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;
}
