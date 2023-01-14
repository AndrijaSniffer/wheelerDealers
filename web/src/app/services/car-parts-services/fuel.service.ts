import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppConstants} from "../../../AppConstants";
import {HttpClient} from "@angular/common/http";
import {Fuel} from "../../classes/fuel";

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private http: HttpClient) { }

  getAllFuel(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_FUEL);
  }

  getFuelById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_FUEL_BY_ID}${id}`);
  }

  createFuel(fuel: Fuel) {
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(fuel)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_FUEL, formData, {withCredentials: true});
  }

  updateFuel(id: number, fuelName: string, kml: number){
    let formData: FormData = new FormData();

    formData.append('fuel_name', fuelName);
    formData.append('kml', kml.toString());

    return this.http.put(`${AppConstants.UPDATE_FUEL_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteFuelById(id: number){
    return this.http.delete(`${AppConstants.DELETE_FUEL_BY_ID}${id}`, {withCredentials: true});
  }
}
