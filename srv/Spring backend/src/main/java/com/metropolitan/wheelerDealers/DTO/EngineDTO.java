package com.metropolitan.wheelerDealers.DTO;

import lombok.Data;

@Data
public class EngineDTO {
    private Integer id;
    private String engineCode;
    private Integer horsepower;
    private Integer kilowatt;
    private Integer volume;
    private Integer idEngineType;
}
