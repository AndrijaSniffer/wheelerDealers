package com.metropolitan.wheelerDealers.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_country", nullable = false)
//    @JsonProperty("id_country")
    private Integer id;

    @Column(name = "name_country", nullable = false)
//    @JsonProperty("name_country")
    private String nameCountry;

}