package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.MessageResponse;
import com.metropolitan.wheelerDealers.entities.Car;
import com.metropolitan.wheelerDealers.services.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cars")
public class CarController {
    @Autowired
    private ICarService carService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Car>> getAllCars(){
        List<Car> countries = carService.getAllCars();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Car> getCarById(@PathVariable int id){
        Car c = carService.getCarById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> createCar(@RequestBody Car car){
        if(carService.createOrUpdateCar(car)){
            return ResponseEntity.ok(new MessageResponse("Created"));
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<MessageResponse> updateCar(@RequestBody Car car){
        if(car.getId() != null) {
            if (carService.createOrUpdateCar(car)) {
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
    public ResponseEntity<MessageResponse> deleteCar(@PathVariable Integer id){
        carService.deleteCar(id);
        return ResponseEntity.ok(new MessageResponse("Deleted"));
    }
}
