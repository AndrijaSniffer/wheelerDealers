import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../../../AppConstants";
import {Fuel} from "../../classes/fuel";
import {Interior} from "../../classes/interior";

@Injectable({
  providedIn: 'root'
})
export class InteriorService {

  constructor(private http: HttpClient) { }

  getAllInterior(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_INTERIOR);
  }

  getInteriorById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_INTERIOR_BY_ID}${id}`);
  }

  createInterior(interior: Interior) {
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(interior)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_INTERIOR, formData, {withCredentials: true});
  }

  updateInterior(id: number, interior: Interior){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(interior)) {
      formData.append(key, value);
    }

    return this.http.put(`${AppConstants.UPDATE_INTERIOR_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteInteriorById(id: number){
    return this.http.delete(`${AppConstants.DELETE_INTERIOR_BY_ID}${id}`, {withCredentials: true});
  }
}
