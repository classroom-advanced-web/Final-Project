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
@Table(name = "roles", indexes = {
        @Index(name = "role_code_index", columnList = "role_code", unique = true),
//        @Index(name = "role_name_index", columnList = "role_name", unique = true)
}
)
@Where(clause = "revoked = false")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "role_id")
    private String id;

    @Column(name = "role_code", nullable = false, unique = true)
    private Long code;

    @Column(name = "role_name", nullable = false, unique = true)
    private String name;

   @OneToMany(mappedBy = "role")
   @JsonIgnore
    private List<ClassUser> classUsers;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<InvitationUrl> invitationUrls;


}
