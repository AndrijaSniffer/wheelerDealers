package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICarRepo extends JpaRepository<Car, Integer> {
}
