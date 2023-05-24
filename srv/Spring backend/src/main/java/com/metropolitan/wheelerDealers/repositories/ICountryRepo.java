package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICountryRepo extends JpaRepository<Country, Integer> {
}
