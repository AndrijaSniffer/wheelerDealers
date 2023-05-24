package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Car;

import java.util.List;

public interface ICarService {
    List<Car> getAllCars();
    boolean createOrUpdateCar(Car car);
    Car getCarById(Integer id);
    void deleteCar(Integer id);
}
