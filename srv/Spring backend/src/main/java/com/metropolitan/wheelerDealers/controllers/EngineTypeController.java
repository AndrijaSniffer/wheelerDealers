package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.EngineType;
import com.metropolitan.wheelerDealers.services.IEngineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("engine-types")
public class EngineTypeController {
    @Autowired
    private IEngineTypeService engineTypeService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<EngineType>> getAllEngineTypes(){
        List<EngineType> countries = engineTypeService.getAllEngineTypes();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<EngineType> getEngineTypeById(@PathVariable int id){
        EngineType c = engineTypeService.getEngineTypeById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> createEngineType(@RequestBody EngineType engineType){
        if(engineTypeService.createOrUpdateEngineType(engineType)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> updateEngineType(@RequestBody EngineType engineType){
        if(engineType.getId() != null) {
            if (engineTypeService.createOrUpdateEngineType(engineType)) {
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
    public ResponseEntity<String> deleteEngineType(@PathVariable Integer id){
        engineTypeService.deleteEngineType(id);
        return ResponseEntity.ok("Deleted");
    }
}
