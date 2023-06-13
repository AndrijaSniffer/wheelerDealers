import {EngineType} from "./engine-type";

export class Engine {
  id?: number;
  engineCode: string
  horsepower?: number
  kilowatt?: number
  volume: number;
  idEngineType: EngineType | number;
}
