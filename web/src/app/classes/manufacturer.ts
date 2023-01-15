import {Country} from "./country";

export class Manufacturer {
  id_manufacturer?: number;
  name_manufacturer: string;
  id_country: Country | number;
}
