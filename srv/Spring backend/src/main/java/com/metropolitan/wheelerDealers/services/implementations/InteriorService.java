package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Interior;
import com.metropolitan.wheelerDealers.repositories.IInteriorRepo;
import com.metropolitan.wheelerDealers.services.IInteriorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InteriorService implements IInteriorService {
    @Autowired
    private IInteriorRepo interiorRepo;

    @Override
    public List<Interior> getAllInteriors() {
        return interiorRepo.findAll();
    }

    @Override
    public boolean createOrUpdateInterior(Interior interior) {
        return interiorRepo.save(interior).getId() != null;
    }

    @Override
    public Interior getInteriorById(Integer id) {
        return interiorRepo.findById(id).orElse(new Interior());
    }

    @Override
    public void deleteInterior(Integer id) {
        interiorRepo.deleteById(id);
    }
}
