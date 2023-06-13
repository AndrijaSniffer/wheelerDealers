import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../../../AppConstants";
import {Observable} from "rxjs";
import {EngineType} from "../../classes/engine-type";

@Injectable({
  providedIn: 'root'
})
export class EngineTypeService {

  constructor(private http: HttpClient) { }

  getAllEngineType(): Observable<any>{
    return this.http.get(AppConstants.GET_ALL_ENGINE_TYPE);
  }

  getEngineTypeById(id: number): Observable<any>{
    return this.http.get(`${AppConstants.GET_ENGINE_TYPE_BY_ID}/${id}`);
  }

  createEngineType(et: EngineType){
    let object: any = {};

    for (const [key, value] of Object.entries(et)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_ENGINE_TYPE, JSON.stringify(object), {withCredentials: true});
  }

  updateEngineType(id: number, engineType: string){
    let object: any = {id: id, engineType: engineType};

    return this.http.put(`${AppConstants.UPDATE_ENGINE_TYPE_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteEngineTypeById(id: number){
    return this.http.delete(`${AppConstants.DELETE_ENGINE_TYPE_BY_ID}/${id}`, {withCredentials: true});
  }
}
