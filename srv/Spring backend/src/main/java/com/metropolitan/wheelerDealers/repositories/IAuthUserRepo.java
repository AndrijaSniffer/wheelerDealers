package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IAuthUserRepo extends JpaRepository<AuthUser, Integer> {
    Optional<AuthUser> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
