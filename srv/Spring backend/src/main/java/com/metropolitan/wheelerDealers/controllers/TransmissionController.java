package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Transmission;
import com.metropolitan.wheelerDealers.services.ITransmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("transmissions")
public class TransmissionController {
    @Autowired
    private ITransmissionService transmissionService;

    @GetMapping()
    public ResponseEntity<List<Transmission>> getAllTransmissions(){
        List<Transmission> countries = transmissionService.getAllTransmissions();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Transmission> getTransmissionById(@PathVariable int id){
        Transmission c = transmissionService.getTransmissionById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createTransmission(@RequestBody Transmission transmission){
        if(transmissionService.createOrUpdateTransmission(transmission)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateTransmission(@RequestBody Transmission transmission){
        if(transmission.getId() != null) {
            if (transmissionService.createOrUpdateTransmission(transmission)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTransmission(@PathVariable Integer id){
        transmissionService.deleteTransmission(id);
        return ResponseEntity.ok("Deleted");
    }
}
