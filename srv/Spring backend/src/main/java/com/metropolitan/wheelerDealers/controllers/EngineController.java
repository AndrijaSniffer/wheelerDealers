package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.EngineDTO;
import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Engine;
import com.metropolitan.wheelerDealers.services.IEngineService;
import com.metropolitan.wheelerDealers.services.IEngineTypeService;
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

    @Autowired
    private IEngineTypeService engineTypeService;

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
    public ResponseEntity<MessageResponse> createEngine(@RequestBody EngineDTO engine){
        Engine engine1 = new Engine(engine.getId(), engine.getEngineCode(), engine.getHorsepower(), engine.getKilowatt(),
                engine.getVolume(), engineTypeService.getEngineTypeById(engine.getIdEngineType()));

        if(engineService.createOrUpdateEngine(engine1)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateEngine(@RequestBody EngineDTO engine){
        Engine engine1 = new Engine(engine.getId(), engine.getEngineCode(), engine.getHorsepower(), engine.getKilowatt(),
                engine.getVolume(), engineTypeService.getEngineTypeById(engine.getIdEngineType()));

        if(engine.getId() != null) {
            if (engineService.createOrUpdateEngine(engine1)) {
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
    public ResponseEntity<MessageResponse> deleteEngine(@PathVariable Integer id){
        engineService.deleteEngine(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}
