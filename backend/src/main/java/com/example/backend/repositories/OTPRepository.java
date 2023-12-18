package com.example.backend.repositories;

import com.example.backend.entities.OTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OTPRepository extends JpaRepository<OTP, String> {
}
