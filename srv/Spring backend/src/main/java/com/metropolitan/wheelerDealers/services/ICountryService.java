package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Country;

import java.util.List;

public interface ICountryService {
    List<Country> getAllCountries();
    boolean createOrUpdateCountry(Country country);
    Country getCountryById(Integer id);
    void deleteCountry(Integer id);
}
