package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.ManufacturerDTO;
import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Manufacturer;
import com.metropolitan.wheelerDealers.services.ICountryService;
import com.metropolitan.wheelerDealers.services.IManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("manufacturers")
public class ManufacturerController {
    @Autowired
    private IManufacturerService manufacturerService;

    @Autowired
    private ICountryService countryService;

    @GetMapping()
//    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Manufacturer>> getAllManufacturers(){
        List<Manufacturer> countries = manufacturerService.getAllManufacturers();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable int id){
        Manufacturer c = manufacturerService.getManufacturerById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createManufacturer(@RequestBody ManufacturerDTO manufacturer){
        Manufacturer manufacturer1 = new Manufacturer(manufacturer.getId(), manufacturer.getNameManufacturer(),
                countryService.getCountryById(manufacturer.getIdCountry()));

        if(manufacturerService.createOrUpdateManufacturer(manufacturer1)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateManufacturer(@RequestBody ManufacturerDTO manufacturer){
        Manufacturer manufacturer1 = new Manufacturer(manufacturer.getId(), manufacturer.getNameManufacturer(),
                countryService.getCountryById(manufacturer.getIdCountry()));

        if(manufacturer.getId() != null) {
            if (manufacturerService.createOrUpdateManufacturer(manufacturer1)) {
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
    public ResponseEntity<MessageResponse> deleteManufacturer(@PathVariable Integer id){
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}
