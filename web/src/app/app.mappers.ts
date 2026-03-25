import {Country} from './classes/country';
import {EngineType} from './classes/engine-type';
import {EmissionClass} from './classes/emission-class';
import {ModelType} from './classes/model-type';
import {TransmissionType} from './classes/transmissionType';
import {Fuel} from './classes/fuel';
import {Drivetrain} from './classes/drivetrain';
import {Manufacturer} from './classes/manufacturer';
import {Model} from './classes/model';
import {Car} from './classes/car';
import {Company} from './classes/company';
import {User} from './classes/user';
import {Image} from './classes/image';
import {AppConstants} from './app.constants';

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
  const companyJson = parsed.PIB; // Adjust this key if it's different (e.g., 'Company')
  const company: Company | null = companyJson ? mapToCompany(companyJson) : null;

  console.log('Parsed user JSON:', parsed);
  console.log('Company:', company);

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

export function mapToTransmissionType(json: any): TransmissionType {
  return {
    id: json.transmission_type,
    type: json.type
  }
}

export function mapToFuel(json: any): Fuel {
  return {
    id: json.fuel,
    type: json.type,
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

export function mapToModel(json: any): Model {
  return {
    id: json.model,
    name: json.name,
    manufacturer: mapToManufacturer(json.manufacturer),
  }
}

export function mapToImage(json: any): Image {
  return {
    image: json.image,
    imageUrl: `${AppConstants.SERVER_URL}${json.image_url}`,
    car: json.car
  }
}

export function mapToCar(json: any): Car {
  return new Car(
    json.car,
    mapToUser(json.user),
    mapToModel(json.model),
    mapToTransmissionType(json.transmission_type),
    mapToEngineType(json.engine_type),
    mapToEmissionClass(json.emission_class),
    mapToFuel(json.fuel),
    mapToDrivetrain(json.drivetrain),
    json.year,
    json.horsepower,
    json.kilowatt,
    json.engine_volume,
    json.gears,
    json.doors,
    json.seats,
    json.steering_wheel_left,
    json.interior_color,
    json.price,
    json.exterior_color,
    json.chassis_number,
    json.is_preowned,
    json.created_at,
    json.images.map((imageJson: any) => mapToImage(imageJson))
  );
}
