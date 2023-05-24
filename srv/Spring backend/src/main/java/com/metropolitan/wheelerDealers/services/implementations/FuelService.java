package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Fuel;
import com.metropolitan.wheelerDealers.repositories.IFuelRepo;
import com.metropolitan.wheelerDealers.services.IFuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuelService implements IFuelService {
    @Autowired
    private IFuelRepo fuelRepo;

    @Override
    public List<Fuel> getAllFuels() {
        return fuelRepo.findAll();
    }

    @Override
    public boolean createOrUpdateFuel(Fuel fuel) {
        return fuelRepo.save(fuel).getId() != null;
    }

    @Override
    public Fuel getFuelById(Integer id) {
        return fuelRepo.findById(id).orElse(new Fuel());
    }

    @Override
    public void deleteFuel(Integer id) {
        fuelRepo.deleteById(id);
    }
}
