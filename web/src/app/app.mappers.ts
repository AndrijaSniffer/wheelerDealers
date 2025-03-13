import {Country} from './classes/country';
import {EngineType} from './classes/engine-type';

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
  }
}
