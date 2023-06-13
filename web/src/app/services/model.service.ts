import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../../AppConstants";
import {Model} from "../classes/model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getAllModel(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_MODEL);
  }

  getModelById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_MODEL_BY_ID}/${id}`);
  }

  createModel(model: Model) {
    let object: any = {}

    for (const [key, value] of Object.entries(model)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_MODEL, JSON.stringify(object), {withCredentials: true});
  }

  updateModel(id: number, model: Model) {
    let object: any = {}

    for (const [key, value] of Object.entries(model)) {
      object[key] = value;
    }

    return this.http.put(`${AppConstants.UPDATE_MODEL_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteModelById(id: number) {
    return this.http.delete(`${AppConstants.DELETE_MODEL_BY_ID}/${id}`, {withCredentials: true});
  }
}
