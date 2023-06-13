package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "engine")
@NoArgsConstructor
public class Engine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_engine", nullable = false)
    private Integer id;

    @Column(name = "engine_code")
    private String engineCode;

    @Column(name = "horsepower")
    private Integer horsepower;

    @Column(name = "kilowatt")
    private Integer kilowatt;

    @Column(name = "volume", nullable = false)
    private Integer volume;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_engine_type")
    private EngineType idEngineType;

}