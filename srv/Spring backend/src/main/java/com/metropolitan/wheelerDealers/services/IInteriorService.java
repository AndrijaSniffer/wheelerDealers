package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Interior;

import java.util.List;

public interface IInteriorService {
    List<Interior> getAllInteriors();
    boolean createOrUpdateInterior(Interior interior);
    Interior getInteriorById(Integer id);
    void deleteInterior(Integer id);
}
