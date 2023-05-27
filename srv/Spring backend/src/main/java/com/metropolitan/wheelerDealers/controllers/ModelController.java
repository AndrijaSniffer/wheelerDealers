package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Model;
import com.metropolitan.wheelerDealers.services.IModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("models")
public class ModelController {
    @Autowired
    private IModelService modelService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Model>> getAllModels(){
        List<Model> countries = modelService.getAllModels();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Model> getModelById(@PathVariable int id){
        Model c = modelService.getModelById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> createModel(@RequestBody Model model){
        if(modelService.createOrUpdateModel(model)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> updateModel(@RequestBody Model model){
        if(model.getId() != null) {
            if (modelService.createOrUpdateModel(model)) {
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
    public ResponseEntity<String> deleteModel(@PathVariable Integer id){
        modelService.deleteModel(id);
        return ResponseEntity.ok("Deleted");
    }
}
