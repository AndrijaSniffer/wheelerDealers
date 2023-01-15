import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../../../AppConstants";
import {Fuel} from "../../classes/fuel";
import {Manufacturer} from "../../classes/manufacturer";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) { }

  getAllManufacturer(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_MANUFACTURER);
  }

  getManufacturerById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_MANUFACTURER_BY_ID}${id}`);
  }

  createManufacturer(manufacturer: Manufacturer) {
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(manufacturer)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_MANUFACTURER, formData, {withCredentials: true});
  }

  updateManufacturer(id: number, manufacturer: Manufacturer){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(manufacturer)) {
      formData.append(key, value);
    }

    return this.http.put(`${AppConstants.UPDATE_MANUFACTURER_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteManufacturerById(id: number){
    return this.http.delete(`${AppConstants.DELETE_MANUFACTURER_BY_ID}${id}`, {withCredentials: true});
  }
}
