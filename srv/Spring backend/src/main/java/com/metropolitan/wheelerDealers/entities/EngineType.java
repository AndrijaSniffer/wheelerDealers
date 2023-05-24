package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "engine_type")
public class EngineType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_engine_type", nullable = false)
    private Integer id;

    @Column(name = "engine_type", nullable = false)
    private String engineType;

}