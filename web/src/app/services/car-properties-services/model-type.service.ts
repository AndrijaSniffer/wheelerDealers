import { Injectable } from '@angular/core';
import {AppConstants} from "../../../AppConstants";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ModelType} from "../../classes/model-type";

@Injectable({
  providedIn: 'root'
})
export class ModelTypeService {

  constructor(private http: HttpClient) { }

  getAllModelType(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_FUEL);
  }

  getModelTypeById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_FUEL_BY_ID}${id}`);
  }

  createModelType(modelType: ModelType) {
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(modelType)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_FUEL, formData, {withCredentials: true});
  }

  updateModelType(id: number, modelType: ModelType){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(modelType)) {
      formData.append(key, value);
    }

    return this.http.put(`${AppConstants.UPDATE_FUEL_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteModelTypeById(id: number){
    return this.http.delete(`${AppConstants.DELETE_FUEL_BY_ID}${id}`, {withCredentials: true});
  }
}
