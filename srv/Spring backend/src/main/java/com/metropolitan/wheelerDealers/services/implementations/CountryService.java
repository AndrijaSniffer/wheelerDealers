package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Country;
import com.metropolitan.wheelerDealers.repositories.ICountryRepo;
import com.metropolitan.wheelerDealers.services.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService implements ICountryService {
    @Autowired
    private ICountryRepo countryRepo;

    @Override
    public List<Country> getAllCountries() {
        return countryRepo.findAll();
    }

    @Override
    public boolean createOrUpdateCountry(Country country) {
        return countryRepo.save(country).getId() != null;
    }

    @Override
    public Country getCountryById(Integer id) {
        return countryRepo.findById(id).orElse(new Country());
    }

    @Override
    public void deleteCountry(Integer id) {
         countryRepo.deleteById(id);
    }
}
