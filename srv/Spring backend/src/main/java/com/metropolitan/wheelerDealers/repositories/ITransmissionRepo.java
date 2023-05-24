package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Transmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITransmissionRepo extends JpaRepository<Transmission, Integer> {
}
