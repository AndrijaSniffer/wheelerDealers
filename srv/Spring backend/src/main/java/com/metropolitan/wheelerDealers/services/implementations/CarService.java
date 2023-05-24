package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Car;
import com.metropolitan.wheelerDealers.repositories.ICarRepo;
import com.metropolitan.wheelerDealers.services.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService implements ICarService {
    @Autowired
    private ICarRepo carRepo;

    @Override
    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    @Override
    public boolean createOrUpdateCar(Car car) {
        return carRepo.save(car).getId() != null;
    }

    @Override
    public Car getCarById(Integer id) {
        return carRepo.findById(id).orElse(new Car());
    }

    @Override
    public void deleteCar(Integer id) {
        carRepo.deleteById(id);
    }
}
