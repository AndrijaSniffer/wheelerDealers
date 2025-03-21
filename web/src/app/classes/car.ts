import {User} from './user';
import {Model} from './model';
import {Transmission} from './transmission';
import {Fuel} from './fuel';
import {Interior} from './interior';
import {Drivetrain} from './drivetrain';

export class Car {
  id: number | null;
  user: User;
  model: Model;
  transmission: Transmission;
  fuel: Fuel;
  interior: Interior;
  drivetrain: Drivetrain;
  price: number;
  color: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;


  constructor(id: number | null, user: User, model: Model, transmission: Transmission, fuel: Fuel, interior: Interior,
              drivetrain: Drivetrain, price: number, color: string | null, chassisNumber: string | null,
              isPreowned: boolean, createdAt: Date) {
    this.id = id;
    this.user = user;
    this.model = model;
    this.transmission = transmission;
    this.fuel = fuel;
    this.interior = interior;
    this.drivetrain = drivetrain;
    this.price = price;
    this.color = color;
    this.chassisNumber = chassisNumber;
    this.isPreowned = isPreowned;
    this.createdAt = createdAt;
  }
}

export interface CarDTO {
  id: number | null;
  user: number;
  model: number;
  transmission: number;
  fuel: number;
  interior: number;
  drivetrain: number;
  price: number;
  color: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;
}
