package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Engine;

import java.util.List;

public interface IEngineService {
    List<Engine> getAllEngines();
    boolean createOrUpdateEngine(Engine engine);
    Engine getEngineById(Integer id);
    void deleteEngine(Integer id);
}
