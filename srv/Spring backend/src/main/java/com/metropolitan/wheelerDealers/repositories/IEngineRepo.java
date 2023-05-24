package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Engine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEngineRepo extends JpaRepository<Engine, Integer> {
}
