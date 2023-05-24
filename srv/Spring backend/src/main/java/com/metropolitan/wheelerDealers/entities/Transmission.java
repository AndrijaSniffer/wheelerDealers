package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "transmission")
public class Transmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transmission", nullable = false)
    private Integer id;

    @Column(name = "number_of_speeds", nullable = false)
    private Integer numberOfSpeeds;

    @Column(name = "transmission_type", nullable = false)
    private String transmissionType;

}