package com.example.backend.repositories;

import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);


    @Query("""
SELECT u
FROM User u
WHERE u.id NOT IN :userIds
"""
    )
    List<User> findByIdNotAdmin(List<String> userIds);
}
