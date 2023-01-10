import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../../AppConstants";
import {Country} from "../classes/country";
import {Form} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private client: HttpClient) {
  }

  getAllCountry() {
    return this.client.get(AppConstants.GET_ALL_COUNTRY, {withCredentials: true});
  }

  getCountryId(id: number) {
    return this.client.get(`${AppConstants.GET_COUNTRY_BY_ID}${id}`, {withCredentials: true});
  }

  createCountry(country: Country){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(country)) {
      formData.append(key, value);
    }

    return this.client.post(AppConstants.CREATE_COUNTRY, formData, {withCredentials: true});
  }

  updateCountryById(id: number, nameCountry: string){
    let formData: FormData = new FormData();

    formData.append('name_country', nameCountry)

    return this.client.put(`${AppConstants.UPDATE_COUNTRY_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteCountryById(id: number){
    return this.client.delete(`${AppConstants.DELETE_COUNTRY_BY_ID}${id}`, {withCredentials: true});
  }
}
