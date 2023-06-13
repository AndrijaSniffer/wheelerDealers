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
    return this.http.get(AppConstants.GET_ALL_MODEL_TYPE);
  }

  getModelTypeById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_MODEL_TYPE_BY_ID}/${id}`);
  }

  createModelType(modelType: ModelType) {
    let object: any = {}

    for (const [key, value] of Object.entries(modelType)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_MODEL_TYPE, JSON.stringify(object), {withCredentials: true});
  }

  updateModelType(id: number, modelType: ModelType) {
    let object: any = {}

    for (const [key, value] of Object.entries(modelType)) {
      object[key] = value;
    }

    object["id"] = id;

    return this.http.put(`${AppConstants.UPDATE_MODEL_TYPE_BY_ID}`, JSON.stringify(modelType), {withCredentials: true});
  }

  deleteModelTypeById(id: number){
    return this.http.delete(`${AppConstants.DELETE_MODEL_TYPE_BY_ID}/${id}`, {withCredentials: true});
  }
}
