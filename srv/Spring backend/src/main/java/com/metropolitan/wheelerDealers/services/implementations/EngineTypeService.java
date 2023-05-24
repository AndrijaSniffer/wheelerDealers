package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.EngineType;
import com.metropolitan.wheelerDealers.repositories.IEngineTypeRepo;
import com.metropolitan.wheelerDealers.services.IEngineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngineTypeService implements IEngineTypeService {
    @Autowired
    private IEngineTypeRepo engineTypeRepo;

    @Override
    public List<EngineType> getAllEngineTypes() {
        return engineTypeRepo.findAll();
    }

    @Override
    public boolean createOrUpdateEngineType(EngineType engineType) {
        return engineTypeRepo.save(engineType).getId() != null;
    }

    @Override
    public EngineType getEngineTypeById(Integer id) {
        return engineTypeRepo.findById(id).orElse(new EngineType());
    }

    @Override
    public void deleteEngineType(Integer id) {
        engineTypeRepo.deleteById(id);
    }
}
