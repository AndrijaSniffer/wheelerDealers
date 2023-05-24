package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Engine;
import com.metropolitan.wheelerDealers.repositories.IEngineRepo;
import com.metropolitan.wheelerDealers.services.IEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngineService implements IEngineService {
    @Autowired
    private IEngineRepo engineRepo;

    @Override
    public List<Engine> getAllEngines() {
        return engineRepo.findAll();
    }

    @Override
    public boolean createOrUpdateEngine(Engine engine) {
        return engineRepo.save(engine).getId() != null;
    }

    @Override
    public Engine getEngineById(Integer id) {
        return engineRepo.findById(id).orElse(new Engine());
    }

    @Override
    public void deleteEngine(Integer id) {
        engineRepo.deleteById(id);
    }
}
