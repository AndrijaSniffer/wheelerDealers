import {Manufacturer} from "./manufacturer";
import {Engine} from "./engine";

export class Model {
  id_model?: number
  name_model: string
  year_of_manufacture: number
  id_manufacturer: Manufacturer | number
  id_engine: Engine | number
}
