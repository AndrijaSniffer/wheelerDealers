package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Transmission;

import java.util.List;

public interface ITransmissionService {
    List<Transmission> getAllTransmissions();
    boolean createOrUpdateTransmission(Transmission transmission);
    Transmission getTransmissionById(Integer id);
    void deleteTransmission(Integer id);
}
