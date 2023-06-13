import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../../../AppConstants";
import {Fuel} from "../../classes/fuel";
import {Transmission} from "../../classes/transmission";

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  constructor(private http: HttpClient) { }

  getAllTrasmission(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_TRANSMISSION);
  }

  getTrasmissionById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_TRANSMISSION_BY_ID}/${id}`);
  }

  createTransmission(transmission: Transmission) {
    let object: any = {}

    for (const [key, value] of Object.entries(transmission)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_TRANSMISSION, JSON.stringify(object), {withCredentials: true});
  }

  updateTransmission(id: number, transmissionType: string, numberOfGears: number){
    let object = {id: id, transmissionType: transmissionType, numberOfGears: numberOfGears};

    return this.http.put(`${AppConstants.UPDATE_TRANSMISSION_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteTrasmissionById(id: number){
    return this.http.delete(`${AppConstants.DELETE_TRANSMISSION_BY_ID}/${id}`, {withCredentials: true});
  }
}
