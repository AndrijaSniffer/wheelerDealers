import {Country} from '@classes/country';

export class Manufacturer {
  id: number | null;
  country: Country;
  name: string;


  constructor(id: number | null, country: Country, name: string) {
    this.id = id;
    this.country = country;
    this.name = name;
  }
}

export interface ManufacturerDTO {
  id: number | null;
  country: number;
  name: string;
}
