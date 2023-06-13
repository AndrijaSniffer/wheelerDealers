package com.metropolitan.wheelerDealers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDTO {
    private Integer id_car;
    private Integer id_user;
    private Integer price;
    private String color;
    private String chassie_number;
    private Boolean is_preowned;
    private Instant created_at;
    private Integer id_fuel;
    private String fuel_name;
    private Integer kml;
    private Integer id_model;
    private String name_model;
    private Integer year_of_manufacture;
    private Integer id_manufacturer;
    private String name_manufacturer;
}
