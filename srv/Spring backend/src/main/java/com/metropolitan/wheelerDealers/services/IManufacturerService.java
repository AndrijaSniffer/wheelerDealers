package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Manufacturer;

import java.util.List;

public interface IManufacturerService {
    List<Manufacturer> getAllManufacturers();
    boolean createOrUpdateManufacturer(Manufacturer manufacturer);
    Manufacturer getManufacturerById(Integer id);
    void deleteManufacturer(Integer id);
}
