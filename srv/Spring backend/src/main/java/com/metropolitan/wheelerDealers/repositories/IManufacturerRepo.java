package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IManufacturerRepo extends JpaRepository<Manufacturer, Integer> {
}
