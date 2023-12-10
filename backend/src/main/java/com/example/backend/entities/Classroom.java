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
@Table(name = "classes")
@Where(clause = "revoked = false")
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Long id;

    @Column(name = "class_name", nullable = false)
    private String name;

    @Column(name = "class_code", nullable = false, unique = true)
    private String code;

    @Column(name = "class_description")
    private String description;

    @Column(name = "class_subject")
    private String subject;

    @Column(name = "class_room")
    private String room;

    @Column(name = "class_image_url", nullable = false)
    private String imageUrl;

    @Column(name = "class_section")
    private String section;

    @OneToMany(mappedBy = "classroom")
    @JsonIgnore
    private List<ClassUser> classUsers;



    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;

}
