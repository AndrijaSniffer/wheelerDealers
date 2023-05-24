package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Car;
import com.metropolitan.wheelerDealers.services.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("cars")
public class CarController {
    @Autowired
    private ICarService carService;

    @GetMapping()
    public ResponseEntity<List<Car>> getAllCars(){
        List<Car> countries = carService.getAllCars();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    public ResponseEntity<Car> getCarById(@PathVariable int id){
        Car c = carService.getCarById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createCar(@RequestBody Car car){
        if(carService.createOrUpdateCar(car)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCar(@RequestBody Car car){
        if(car.getId() != null) {
            if (carService.createOrUpdateCar(car)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Integer id){
        carService.deleteCar(id);
        return ResponseEntity.ok("Deleted");
    }
}
