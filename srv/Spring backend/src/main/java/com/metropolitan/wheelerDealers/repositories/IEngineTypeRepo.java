package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.EngineType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEngineTypeRepo extends JpaRepository<EngineType, Integer> {
}
