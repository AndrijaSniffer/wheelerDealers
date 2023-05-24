package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "car_image")
public class CarImage {
    @EmbeddedId
    private CarImageId id;

    @MapsId("idImage")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_image", nullable = false)
    private Image idImage;

    @MapsId("idCar")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_car", nullable = false)
    private Car idCar;

}