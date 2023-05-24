package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Fuel;

import java.util.List;

public interface IFuelService {
    List<Fuel> getAllFuels();
    boolean createOrUpdateFuel(Fuel fuel);
    Fuel getFuelById(Integer id);
    void deleteFuel(Integer id);
}
