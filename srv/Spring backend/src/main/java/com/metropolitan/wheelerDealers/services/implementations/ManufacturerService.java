package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Manufacturer;
import com.metropolitan.wheelerDealers.repositories.IManufacturerRepo;
import com.metropolitan.wheelerDealers.services.IManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerService implements IManufacturerService {
    @Autowired
    private IManufacturerRepo manufacturerRepo;

    @Override
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepo.findAll();
    }

    @Override
    public boolean createOrUpdateManufacturer(Manufacturer manufacturer) {
        return manufacturerRepo.save(manufacturer).getId() != null;
    }

    @Override
    public Manufacturer getManufacturerById(Integer id) {
        return manufacturerRepo.findById(id).orElse(new Manufacturer());
    }

    @Override
    public void deleteManufacturer(Integer id) {
        manufacturerRepo.deleteById(id);
    }
}
