package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Country;
import com.metropolitan.wheelerDealers.services.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("countries")
public class CountryController {
    @Autowired
    private ICountryService countryService;

    @GetMapping()
    public ResponseEntity<List<Country>> getAllCountries(){
        List<Country> countries = countryService.getAllCountries();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable int id){
        Country c = countryService.getCountryById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createCountry(@RequestBody Country country){
        if(countryService.createOrUpdateCountry(country)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCountry(@RequestBody Country country){
        if(country.getId() != null) {
            if (countryService.createOrUpdateCountry(country)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCountry(@PathVariable Integer id){
        countryService.deleteCountry(id);
        return ResponseEntity.ok("Deleted");
    }

}
