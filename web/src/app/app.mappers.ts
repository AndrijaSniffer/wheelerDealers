import {Country} from './classes/country';
import {EngineType} from './classes/engine-type';
import {EmissionClass} from './classes/emission-class';
import {ModelType} from './classes/model-type';
import {Transmission} from './classes/transmission';
import {Fuel} from './classes/fuel';
import {Interior} from './classes/interior';
import {Drivetrain} from './classes/drivetrain';
import {Manufacturer} from './classes/manufacturer';

export function mapToCountry(json: any): Country {
  return {
    id: json.country, // Map "country" from JSON to "id"
    name: json.name
  };
}

export function mapToEngineType(json: any): EngineType {
  return {
    id: json.engine_type,
    type: json.type,
  };
}

export function mapToEmissionClass(json: any): EmissionClass {
  return {
    id: json.emission_class,
    className: json.class_name
  };
}

export function mapToModelType(json: any): ModelType {
  return {
    id: json.model_type,
    type: json.type
  };
}

export function mapToTransmission(json: any): Transmission {
  return {
    id: json.transmission,
    type: json.type,
    gears: json.gears
  }
}

export function mapToFuel(json: any): Fuel {
  return {
    id: json.fuel,
    type: json.type,
  }
}

export function mapToInterior(json: any): Interior {
  return {
    id: json.interior,
    doors: json.doors,
    seats: json.seats,
    color: json.color,
    steeringWheelLeft: json.steering_wheel_left,
  }
}

export function mapToDrivetrain(json: any): Drivetrain {
  return {
    id: json.drivetrain,
    type: json.type
  }
}

export function mapToManufacturer(json: any): Manufacturer {
  return {
    id: json.manufacturer,
    name: json.name,
    country: mapToCountry(json.country)
  }
}
