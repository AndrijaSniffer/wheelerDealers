package com.metropolitan.wheelerDealers.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "model_type")
public class ModelType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_model_type", nullable = false)
    private Integer id;

    @Column(name = "type_name", nullable = false)
    private String typeName;

}