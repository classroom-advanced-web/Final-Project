package com.example.backend.repositories;

import com.example.backend.entities.InvitationUrl;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationUrlRepository extends JpaRepository<InvitationUrl, Long> {
}
