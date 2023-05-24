package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IModelRepo extends JpaRepository<Model, Integer> {
}
