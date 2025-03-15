import {EngineType} from './engine-type';
import {EmissionClass} from './emission-class';

export class Engine {
  id: number | null;
  engineType: EngineType;
  emissionClass: EmissionClass;
  engineCode: string;
  horsepower: number;
  kilowatt: number;
  volume: number;

  constructor(id: number | null, engineType: EngineType, emissionClass: EmissionClass, engineCode: string, horsepower: number, kilowatt: number, volume: number) {
    this.id = id;
    this.engineType = engineType;
    this.emissionClass = emissionClass;
    this.engineCode = engineCode;
    this.horsepower = horsepower;
    this.kilowatt = kilowatt;
    this.volume = volume;
  }
}

export interface EngineDTO {
  id: number | null;
  engineType: number;
  emissionClass: number;
  engineCode: string;
  horsepower: number;
  kilowatt: number;
  volume: number;
}
