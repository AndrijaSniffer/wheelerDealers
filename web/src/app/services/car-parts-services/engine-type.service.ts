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
    return this.http.get(`${AppConstants.GET_ENGINE_TYPE_BY_ID}${id}`);
  }

  createEngineType(et: EngineType){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(et)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_ENGINE_TYPE, formData, {withCredentials: true});
  }

  updateEngineType(id: number, engineType: string){
    let formData: FormData = new FormData();

    formData.append('engine_type', engineType);
    return this.http.put(`${AppConstants.UPDATE_ENGINE_TYPE_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteEngineTypeById(id: number){
    return this.http.delete(`${AppConstants.DELETE_ENGINE_TYPE_BY_ID}${id}`, {withCredentials: true});
  }
}
