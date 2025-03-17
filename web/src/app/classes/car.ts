import {User} from './user';
import {Model} from './model';
import {Transmission} from './transmission';
import {Fuel} from './fuel';
import {Interior} from './interior';

export class Car {
  id: number | null;
  user: User;
  model: Model;
  transmission: Transmission;
  fuel: Fuel;
  interior: Interior;
  price: number;
  color: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;


  constructor(id: number | null, user: User, model: Model, transmission: Transmission, fuel: Fuel, interior: Interior,
              price: number, color: string | null, chassis_number: string | null, is_preowned: boolean, created_at: Date) {
    this.id = id;
    this.user = user;
    this.model = model;
    this.transmission = transmission;
    this.fuel = fuel;
    this.interior = interior;
    this.price = price;
    this.color = color;
    this.chassisNumber = chassis_number;
    this.isPreowned = is_preowned;
    this.createdAt = created_at;
  }
}

export interface CarDTO {
  id: number | null;
  user: number;
  model: number;
  transmission: number;
  fuel: number;
  interior: number;
  price: number;
  color: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;
}
