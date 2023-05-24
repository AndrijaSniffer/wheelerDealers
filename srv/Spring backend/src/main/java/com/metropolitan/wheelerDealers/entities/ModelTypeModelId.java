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
public class ModelTypeModelId implements Serializable {
    @Serial
    private static final long serialVersionUID = 5794562943501251452L;
    @Column(name = "id_model_type", nullable = false)
    private Integer idModelType;

    @Column(name = "id_model", nullable = false)
    private Integer idModel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ModelTypeModelId entity = (ModelTypeModelId) o;
        return Objects.equals(this.idModel, entity.idModel) &&
                Objects.equals(this.idModelType, entity.idModelType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idModel, idModelType);
    }

}