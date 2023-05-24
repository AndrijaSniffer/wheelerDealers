package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Fuel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFuelRepo extends JpaRepository<Fuel, Integer> {
}
