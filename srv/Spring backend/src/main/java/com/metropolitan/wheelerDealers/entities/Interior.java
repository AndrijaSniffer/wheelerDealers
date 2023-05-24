package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "interior")
public class Interior {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_interior", nullable = false)
    private Integer id;

    @Column(name = "number_of_doors", nullable = false)
    private Integer numberOfDoors;

    @Column(name = "number_of_seats", nullable = false)
    private Integer numberOfSeats;

    @Column(name = "left_side_steering_wheel", nullable = false)
    private Boolean leftSideSteeringWheel = false;

    @Column(name = "color")
    private String color;

}