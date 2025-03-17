import {Country} from './classes/country';
import {EngineType} from './classes/engine-type';
import {EmissionClass} from './classes/emission-class';
import {ModelType} from './classes/model-type';
import {Transmission} from './classes/transmission';
import {Fuel} from './classes/fuel';
import {Interior} from './classes/interior';
import {Drivetrain} from './classes/drivetrain';
import {Manufacturer} from './classes/manufacturer';
import {Engine} from './classes/engine';
import {Model} from './classes/model';
import {Car} from './classes/car';
import {Company} from './classes/company';
import {User} from './classes/user';

export function mapToCompany(json: any): Company {
  return {
    PIB: json.PIB,
    address: json.address,
    phone: json.phone,
    logoUrl: json.logo_url,
    websiteUrl: json.website_url
  }
}

export function mapToUser(json: any): User {
  // Handle string input by parsing it; otherwise, use as-is
  const parsed = typeof json === 'string' ? JSON.parse(json) : json;

  // Normalize company using mapToCompany
  const companyJson = parsed.company; // Adjust this key if it's different (e.g., 'Company')
  const company: Company | null = companyJson ? mapToCompany(companyJson) : null;

  // Normalize fields with fallback for both naming conventions
  const id = parsed.id ?? parsed.user_id;
  const lastLogin = parsed.lastLogin ?? parsed.last_login;
  const isSuperuser = parsed.isSuperuser ?? parsed.is_superuser;
  const username = parsed.username ?? parsed.user_name;
  const email = parsed.email;
  const isStaff = parsed.isStaff ?? parsed.is_staff;
  const isActive = parsed.isActive ?? parsed.is_active;
  const dateJoined = parsed.dateJoined ?? parsed.date_joined;
  const phone = parsed.phone ?? parsed.user_phone;
  const address = parsed.address ?? parsed.user_address;
  const isReseller = parsed.isReseller ?? parsed.is_reseller;

  // Return a new User instance
  return new User(
    id,
    company,
    lastLogin,
    isSuperuser,
    username,
    email,
    isStaff,
    isActive,
    dateJoined,
    phone,
    address,
    isReseller
  );
}

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

export function mapToEngine(json: any): Engine {
  return {
    id: json.engine,
    engineType: mapToEngineType(json.engine_type),
    emissionClass: mapToEmissionClass(json.emission_class),
    engineCode: json.engine_code,
    horsepower: json.horsepower,
    kilowatt: json.kilowatt,
    volume: json.volume,
  }
}

export function mapToModel(json: any): Model {
  return {
    id: json.model,
    name: json.name,
    yearOfManufacture: json.year_of_manufacture,
    manufacturer: mapToManufacturer(json.manufacturer),
    engine: mapToEngine(json.engine),
  }
}

export function mapToCar(json: any): Car {
  return {
    id: json.car,
    user: mapToUser(json.user),
    model: mapToModel(json.model),
    transmission: mapToTransmission(json.transmission),
    fuel: mapToFuel(json.fuel),
    interior: mapToInterior(json.interior),
    price: json.price,
    chassisNumber: json.chassis_number,
    color: json.color,
    isPreowned: json.is_preowned,
    createdAt: json.created_at,
  }
}
