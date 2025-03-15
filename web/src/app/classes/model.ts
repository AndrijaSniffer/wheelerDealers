import {Manufacturer} from './manufacturer';
import {Engine} from './engine';

export class Model {
  id: number | null;
  name: string;
  yearOfManufacture: number;
  manufacturer: Manufacturer;
  engine: Engine;


  constructor(id: number | null, name: string, yearOfManufacture: number, manufacturer: Manufacturer, engine: Engine) {
    this.id = id;
    this.name = name;
    this.yearOfManufacture = yearOfManufacture;
    this.manufacturer = manufacturer;
    this.engine = engine;
  }
}

export interface ModelDTO {
  id: number | null;
  name: string;
  yearOfManufacture: number;
  manufacturer: number;
  engine: number;
}
