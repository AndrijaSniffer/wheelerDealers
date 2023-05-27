package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Engine;
import com.metropolitan.wheelerDealers.services.IEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("engines")
public class EngineController {
    @Autowired
    private IEngineService engineService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Engine>> getAllEngines(){
        List<Engine> countries = engineService.getAllEngines();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Engine> getEngineById(@PathVariable int id){
        Engine c = engineService.getEngineById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> createEngine(@RequestBody Engine engine){
        if(engineService.createOrUpdateEngine(engine)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> updateEngine(@RequestBody Engine engine){
        if(engine.getId() != null) {
            if (engineService.createOrUpdateEngine(engine)) {
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
    public ResponseEntity<String> deleteEngine(@PathVariable Integer id){
        engineService.deleteEngine(id);
        return ResponseEntity.ok("Deleted");
    }
}
