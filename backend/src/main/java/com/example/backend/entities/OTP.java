package com.example.backend.entities;

import com.example.backend.constants.AppConstant;
import com.example.backend.services.otp.OTPServiceImpl;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "otps")
@Where(clause = "revoked = false")
public class OTP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "otp_id")
    private Long id;

    private String value;

    private boolean revoked;

    @Column(name = "expired_date")
    private Date expiredDate;

    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    @Column(name = "updated_date")
    @LastModifiedDate
    private Date updatedDate;


    public static Timestamp calculateExpiration() {
        // Calculate the expiration time (5 minutes from now)
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expirationTime = now.plusSeconds(AppConstant.OTP_PERIOD);

        // Convert LocalDateTime to Timestamp
        return Timestamp.valueOf(expirationTime);
    }
}
