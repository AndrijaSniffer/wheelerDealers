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
    return this.http.get(`${AppConstants.GET_FUEL_BY_ID}/${id}`);
  }

  createFuel(fuel: Fuel) {
    let object: any = {}

    for (const [key, value] of Object.entries(fuel)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_FUEL, JSON.stringify(object), {withCredentials: true});
  }

  updateFuel(id: number, fuelName: string, kml: number){
    let object: any = {id: id, fuelName: fuelName, kml: kml};

    return this.http.put(`${AppConstants.UPDATE_FUEL_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteFuelById(id: number){
    return this.http.delete(`${AppConstants.DELETE_FUEL_BY_ID}/${id}`, {withCredentials: true});
  }
}
