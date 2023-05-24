package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class CarImageId implements Serializable {
    @Serial
    private static final long serialVersionUID = 672064904791941213L;
    @Column(name = "id_image", nullable = false)
    private Integer idImage;

    @Column(name = "id_car", nullable = false)
    private Integer idCar;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CarImageId entity = (CarImageId) o;
        return Objects.equals(this.idImage, entity.idImage) &&
                Objects.equals(this.idCar, entity.idCar);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idImage, idCar);
    }

}