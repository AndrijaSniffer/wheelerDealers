package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Country;
import com.metropolitan.wheelerDealers.services.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("countries")
public class CountryController {
    @Autowired
    private ICountryService countryService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Country>> getAllCountries(){
        List<Country> countries = countryService.getAllCountries();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Country> getCountryById(@PathVariable int id){
        Country c = countryService.getCountryById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createCountry(@RequestBody Country country){
        if(countryService.createOrUpdateCountry(country)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateCountry(@RequestBody Country country){
        if(country.getId() != null) {
            if (countryService.createOrUpdateCountry(country)) {
                return ResponseEntity.ok(new MessageResponse("Updated"));
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> deleteCountry(@PathVariable Integer id){
        countryService.deleteCountry(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }

}
