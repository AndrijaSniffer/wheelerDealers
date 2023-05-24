package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Fuel;
import com.metropolitan.wheelerDealers.services.IFuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("fuel")
public class FuelController {
    @Autowired
    private IFuelService fuelService;

    @GetMapping()
    public ResponseEntity<List<Fuel>> getAllFuel(){
        List<Fuel> countries = fuelService.getAllFuels();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Fuel> getFuelById(@PathVariable int id){
        Fuel c = fuelService.getFuelById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createFuel(@RequestBody Fuel fuel){
        if(fuelService.createOrUpdateFuel(fuel)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateFuel(@RequestBody Fuel fuel){
        if(fuel.getId() != null) {
            if (fuelService.createOrUpdateFuel(fuel)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteFuel(@PathVariable Integer id){
        fuelService.deleteFuel(id);
        return ResponseEntity.ok("Deleted");
    }
}
