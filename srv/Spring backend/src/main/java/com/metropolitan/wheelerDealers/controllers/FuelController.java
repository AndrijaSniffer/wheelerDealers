package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Fuel;
import com.metropolitan.wheelerDealers.services.IFuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fuel")
public class FuelController {
    @Autowired
    private IFuelService fuelService;

    @GetMapping()
//    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Fuel>> getAllFuel(){
        List<Fuel> countries = fuelService.getAllFuels();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Fuel> getFuelById(@PathVariable int id){
        Fuel c = fuelService.getFuelById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createFuel(@RequestBody Fuel fuel){
        if(fuelService.createOrUpdateFuel(fuel)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateFuel(@RequestBody Fuel fuel){
        if(fuel.getId() != null) {
            if (fuelService.createOrUpdateFuel(fuel)) {
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
    public ResponseEntity<MessageResponse> deleteFuel(@PathVariable Integer id){
        fuelService.deleteFuel(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}
