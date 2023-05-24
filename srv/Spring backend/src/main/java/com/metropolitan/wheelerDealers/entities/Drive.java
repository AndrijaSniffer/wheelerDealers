package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "drive")
public class Drive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_drive", nullable = false)
    private Integer id;

    @Column(name = "drive_type", nullable = false)
    private String driveType;

}