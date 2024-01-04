package com.example.backend.repositories;

import com.example.backend.entities.ReceivedNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceivedNotificationRepository extends JpaRepository<ReceivedNotification, String> {
}
