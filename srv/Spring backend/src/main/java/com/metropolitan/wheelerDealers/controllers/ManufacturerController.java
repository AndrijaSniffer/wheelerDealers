package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Manufacturer;
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

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
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
    public ResponseEntity<String> createManufacturer(@RequestBody Manufacturer manufacturer){
        if(manufacturerService.createOrUpdateManufacturer(manufacturer)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
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
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> deleteManufacturer(@PathVariable Integer id){
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.ok("Deleted");
    }
}
