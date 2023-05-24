package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "model_type_model")
public class ModelTypeModel {
    @EmbeddedId
    private ModelTypeModelId id;

    @MapsId("idModelType")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_model_type", nullable = false)
    private ModelType idModelType;

    @MapsId("idModel")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_model", nullable = false)
    private Model idModel;

}