package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Transmission;
import com.metropolitan.wheelerDealers.repositories.ITransmissionRepo;
import com.metropolitan.wheelerDealers.services.ITransmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransmissionService implements ITransmissionService {
    @Autowired
    private ITransmissionRepo transmissionRepo;

    @Override
    public List<Transmission> getAllTransmissions() {
        return transmissionRepo.findAll();
    }

    @Override
    public boolean createOrUpdateTransmission(Transmission transmission) {
        return transmissionRepo.save(transmission).getId() != null;
    }

    @Override
    public Transmission getTransmissionById(Integer id) {
        return transmissionRepo.findById(id).orElse(new Transmission());
    }

    @Override
    public void deleteTransmission(Integer id) {
        transmissionRepo.deleteById(id);
    }
}
