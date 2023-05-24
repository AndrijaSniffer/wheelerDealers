package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Manufacturer;
import com.metropolitan.wheelerDealers.services.IManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("manufacturers")
public class ManufacturerController {
    @Autowired
    private IManufacturerService manufacturerService;

    @GetMapping()
    public ResponseEntity<List<Manufacturer>> getAllManufacturers(){
        List<Manufacturer> countries = manufacturerService.getAllManufacturers();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable int id){
        Manufacturer c = manufacturerService.getManufacturerById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createManufacturer(@RequestBody Manufacturer manufacturer){
        if(manufacturerService.createOrUpdateManufacturer(manufacturer)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateManufacturer(@RequestBody Manufacturer manufacturer){
        if(manufacturer.getId() != null) {
            if (manufacturerService.createOrUpdateManufacturer(manufacturer)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteManufacturer(@PathVariable Integer id){
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.ok("Deleted");
    }
}
