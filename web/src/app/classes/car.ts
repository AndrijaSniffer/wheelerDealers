import {User} from "./user";
import {Model} from "./model";
import {Transmission} from "./transmission";
import {Fuel} from "./fuel";
import {Interior} from "./interior";

export class Car {
  id_car?: number
  id_user: User | number
  id_model: Model | number
  id_transmission: Transmission | number
  id_fuel: Fuel | number
  id_interior: Interior | number
  price: number
  color?: string
  chassie_number?: string
  is_preowned?: boolean
  created_at: string
}
