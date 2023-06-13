package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "model")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_model", nullable = false)
    private Integer id;

    @Column(name = "name_model", nullable = false, length = 150)
    private String nameModel;

    @Column(name = "year_of_manufacture", nullable = false)
    private Integer yearOfManufacture;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_manufacturer", nullable = false)
    private Manufacturer idManufacturer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_engine")
    private Engine idEngine;

}