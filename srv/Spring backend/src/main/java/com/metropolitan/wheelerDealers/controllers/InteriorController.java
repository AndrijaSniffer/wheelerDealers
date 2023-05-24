package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Interior;
import com.metropolitan.wheelerDealers.services.IInteriorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("interiors")
public class InteriorController {
    @Autowired
    private IInteriorService interiorService;

    @GetMapping()
    public ResponseEntity<List<Interior>> getAllInteriors(){
        List<Interior> countries = interiorService.getAllInteriors();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Interior> getInteriorById(@PathVariable int id){
        Interior c = interiorService.getInteriorById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createInterior(@RequestBody Interior interior){
        if(interiorService.createOrUpdateInterior(interior)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateInterior(@RequestBody Interior interior){
        if(interior.getId() != null) {
            if (interiorService.createOrUpdateInterior(interior)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInterior(@PathVariable Integer id){
        interiorService.deleteInterior(id);
        return ResponseEntity.ok("Deleted");
    }
}
