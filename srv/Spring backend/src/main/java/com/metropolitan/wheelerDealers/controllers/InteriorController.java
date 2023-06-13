package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Interior;
import com.metropolitan.wheelerDealers.services.IInteriorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("interiors")
public class InteriorController {
    @Autowired
    private IInteriorService interiorService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Interior>> getAllInteriors(){
        List<Interior> countries = interiorService.getAllInteriors();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Interior> getInteriorById(@PathVariable int id){
        Interior c = interiorService.getInteriorById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createInterior(@RequestBody Interior interior){
        if(interiorService.createOrUpdateInterior(interior)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateInterior(@RequestBody Interior interior){
        if(interior.getId() != null) {
            if (interiorService.createOrUpdateInterior(interior)) {
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
    public ResponseEntity<MessageResponse> deleteInterior(@PathVariable Integer id){
        interiorService.deleteInterior(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}
