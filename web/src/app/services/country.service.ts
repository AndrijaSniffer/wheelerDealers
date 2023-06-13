import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../../AppConstants";
import {Country} from "../classes/country";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private client: HttpClient) {
  }

  getAllCountry(): Observable<any> {
    return this.client.get(AppConstants.GET_ALL_COUNTRY, {withCredentials: true});
  }

  getCountryId(id: number): Observable<any> {
    return this.client.get(`${AppConstants.GET_COUNTRY_BY_ID}/${id}`, {withCredentials: true});
  }

  createCountry(country: Country) {
    let object: any = {};

    for (const [key, value] of Object.entries(country)) {
      object[key] = value;
    }

    return this.client.post(AppConstants.CREATE_COUNTRY, JSON.stringify(object), {withCredentials: true});
  }

  updateCountryById(id: number, nameCountry: string) {
    let object: any = {id: id, nameCountry: nameCountry}

    return this.client.put(`${AppConstants.UPDATE_COUNTRY_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteCountryById(id: number) {
    return this.client.delete(`${AppConstants.DELETE_COUNTRY_BY_ID}/${id}`, {withCredentials: true});
  }
}
