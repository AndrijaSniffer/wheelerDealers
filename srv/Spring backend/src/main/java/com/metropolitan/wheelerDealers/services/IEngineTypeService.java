package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.EngineType;

import java.util.List;

public interface IEngineTypeService {
    List<EngineType> getAllEngineTypes();
    boolean createOrUpdateEngineType(EngineType engineType);
    EngineType getEngineTypeById(Integer id);
    void deleteEngineType(Integer id);
}
