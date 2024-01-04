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
@Table(name = "grade_of_user")
@Where(clause = "revoked = false")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "grade_id")
    private String id;

    @Column(name = "grade_value", nullable = false)
    private Double value;

    @ManyToOne
    @JoinColumn(name = "grade_composition_id", nullable = false)
    private GradeComposition gradeComposition;

    @ManyToOne
    @JoinColumn(name = "class_user_id", nullable = false)
    private ClassUser classUser;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;
}
