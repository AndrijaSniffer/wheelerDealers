import {EngineType} from "./engine-type";

export class Engine {
  "id_engine"?: number;
  "engine_code": string
  "horsepower"?: number
  "kilowatt"?: number
  "volume": number;
  "id_engine_type": EngineType | number;
}
