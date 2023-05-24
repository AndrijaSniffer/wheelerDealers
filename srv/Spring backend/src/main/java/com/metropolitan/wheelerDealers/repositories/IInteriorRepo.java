package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Interior;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInteriorRepo extends JpaRepository<Interior, Integer> {
}
