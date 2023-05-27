package com.metropolitan.wheelerDealers.DTO;

import lombok.Data;

@Data
public class SearchDTO {
    Integer idManufacturer;
    Integer idModel;
    Integer idTransmission;
    Integer idFuel;
    Integer idDrive;
    Boolean isPreowned;
    Integer priceFrom;
    Integer priceTo;
    Integer volume;
    Integer hpFrom;
    Integer hpTo;
    Integer kwFrom;
    Integer kwTo;
    String carColor;
    Boolean leftSideSteeringWheel;
}
