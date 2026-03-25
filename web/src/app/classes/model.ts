import {Manufacturer} from '@classes/manufacturer';

export class Model {
  id: number | null;
  name: string;
  manufacturer: Manufacturer;

  constructor(id: number | null, name: string, manufacturer: Manufacturer) {
    this.id = id;
    this.name = name;
    this.manufacturer = manufacturer;
  }
}

export interface ModelDTO {
  id: number | null;
  name: string;
  manufacturer: number;
}
