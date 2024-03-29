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
@Table(name = "grade_composition")
@Where(clause = "revoked = false")
public class GradeComposition {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "grade_composition_id")
    private String id;

    @Column(name = "grade_composition_name", nullable = false)
    private String name;

    @Column(name = "grade_composition_scale", nullable = false)
    private Double scale;

    @Column(name = "grade_composition_weight", nullable = false)
    private int weight;

    @Column(name = "grade_composition_is_final", nullable = false)
    private boolean isFinal;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Classroom classroom;

    @OneToMany(mappedBy = "gradeComposition")
    @JsonIgnore
    private List<Grade> grades;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;
}
