import {Country} from './classes/country';

export function mapToCountry(json: any): Country {
  return {
    id: json.country, // Map "country" from JSON to "id"
    name: json.name
  };
}
