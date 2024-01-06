package com.example.backend.repositories;

import com.example.backend.entities.Notification;
import com.example.backend.entities.ReceivedNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceivedNotificationRepository extends JpaRepository<ReceivedNotification, String> {
    List<ReceivedNotification> findAllByReceiverId(String id);
}
