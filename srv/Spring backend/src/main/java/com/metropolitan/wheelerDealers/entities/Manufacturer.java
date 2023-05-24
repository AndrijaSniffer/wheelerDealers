package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "manufacturer")
public class Manufacturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_manufacturer", nullable = false)
    private Integer id;

    @Column(name = "name_manufacturer", nullable = false, length = 150)
    private String nameManufacturer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_country")
    private Country idCountry;

}