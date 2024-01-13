package com.example.backend.repositories;

import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);


    @Query(value = "SELECT * FROM users u WHERE u.user_id NOT IN ?1 ",
            nativeQuery = true
    )
    List<User> findByIdNotAdmin(List<String> userIds);
}
