import {User} from './user';
import {Model} from './model';
import {TransmissionType} from './transmissionType';
import {Fuel} from './fuel';
import {Drivetrain} from './drivetrain';
import {EngineType} from './engine-type';
import {EmissionClass} from './emission-class';

export class Car {
  id: number | null;
  user: User;
  model: Model;
  transmissionType: TransmissionType;
  engineType: EngineType;
  emissionClass: EmissionClass;
  fuel: Fuel;
  drivetrain: Drivetrain;
  year: number;
  horsepower: number;
  kilowatt: number;
  engineVolume: number;
  transmissionGears: number | null;
  doors: number;
  seats: number;
  steeringWheelLeft: boolean;
  interiorColor: string | null;
  price: number;
  exteriorColor: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;

  constructor(
    id: number | null,
    user: User,
    model: Model,
    transmissionType: TransmissionType,
    engineType: EngineType,
    emissionClass: EmissionClass,
    fuel: Fuel,
    drivetrain: Drivetrain,
    year: number,
    horsepower: number,
    kilowatt: number,
    engineVolume: number,
    transmissionGears: number,
    doors: number,
    seats: number,
    steeringWheelLeft: boolean,
    interiorColor: string | null,
    price: number,
    exteriorColor: string | null,
    chassisNumber: string | null,
    isPreowned: boolean,
    createdAt: Date
  ) {
    this.id = id;
    this.user = user;
    this.model = model;
    this.transmissionType = transmissionType;
    this.engineType = engineType;
    this.emissionClass = emissionClass;
    this.fuel = fuel;
    this.drivetrain = drivetrain;
    this.year = year;
    this.horsepower = horsepower;
    this.kilowatt = kilowatt;
    this.engineVolume = engineVolume;
    this.transmissionGears = transmissionGears;
    this.doors = doors;
    this.seats = seats;
    this.steeringWheelLeft = steeringWheelLeft;
    this.interiorColor = interiorColor;
    this.price = price;
    this.exteriorColor = exteriorColor;
    this.chassisNumber = chassisNumber;
    this.isPreowned = isPreowned;
    this.createdAt = createdAt;
  }
}

export interface CarDTO {
  id: number | null;
  user: number;
  model: number;
  transmissionType: number;
  engineType: number;
  emissionClass: number;
  fuel: number;
  drivetrain: number;
  year: number;
  horsepower: number;
  kilowatt: number;
  engineVolume: number;
  transmissionGears: number | null;
  doors: number;
  seats: number;
  steeringWheelLeft: boolean;
  interiorColor: string | null;
  price: number;
  exteriorColor: string | null;
  chassisNumber: string | null;
  isPreowned: boolean;
  createdAt: Date;
}
