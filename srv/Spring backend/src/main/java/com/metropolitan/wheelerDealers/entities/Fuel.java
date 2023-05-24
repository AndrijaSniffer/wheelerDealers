package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "fuel")
public class Fuel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fuel", nullable = false)
    private Integer id;

    @Column(name = "fuel_name", nullable = false)
    private String fuelName;

    @Column(name = "kml")
    private Integer kml;

}