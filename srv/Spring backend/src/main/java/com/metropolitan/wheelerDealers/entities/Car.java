package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_car", nullable = false)
    private Integer id;

    @Column(name = "id_user", nullable = false)
    private Integer idUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_model", nullable = false)
    private Model idModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_transmission")
    private Transmission idTransmission;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_drive", nullable = false)
    private Drive idDrive;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_fuel", nullable = false)
    private Fuel idFuel;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_interior", nullable = false)
    private Interior idInterior;

    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "color")
    private String color;

    @Column(name = "chassie_number")
    private String chassieNumber;

    @Column(name = "is_preowned", nullable = false)
    private Boolean isPreowned = false;

    @Column(name = "created_at")
    private Instant createdAt;

}