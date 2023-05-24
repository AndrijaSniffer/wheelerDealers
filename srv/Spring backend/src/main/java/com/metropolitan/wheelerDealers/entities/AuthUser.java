package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "auth_user")
public class AuthUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "password", nullable = false, length = 128)
    private String password;

    @Column(name = "last_login")
    private Instant lastLogin;

    @Column(name = "is_superuser", nullable = false)
    private Boolean isSuperuser = false;

    @Column(name = "username", nullable = false, length = 150)
    private String username;

    @Column(name = "first_name", nullable = false, length = 150)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 150)
    private String lastName;

    @Column(name = "email", nullable = false, length = 254)
    private String email;

    @Column(name = "is_staff", nullable = false)
    private Boolean isStaff = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    @Column(name = "date_joined", nullable = false)
    private Instant dateJoined;

}