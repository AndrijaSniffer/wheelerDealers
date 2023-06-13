import {Manufacturer} from "./manufacturer";
import {Engine} from "./engine";

export class Model {
  id?: number
  nameModel: string
  yearOfManufacture: number
  idManufacturer: Manufacturer | number
  idEngine: Engine | number
}
