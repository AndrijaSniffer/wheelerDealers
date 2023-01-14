import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppConstants} from "../../../AppConstants";
import {HttpClient} from "@angular/common/http";
import {Engine} from "../../classes/engine";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(private http: HttpClient) { }

  getAllEngine(): Observable<any>{
    return this.http.get(AppConstants.GET_ALL_ENGINE);
  }

  getEngineById(id: number): Observable<any>{
    return this.http.get(`${AppConstants.GET_ENGINE_BY_ID}${id}`);
  }

  createEngine(et: Engine){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(et)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_ENGINE, formData, {withCredentials: true});
  }

  updateEngine(id: number, engine: Engine){
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(engine)) {
      formData.append(key, value);
    }

    return this.http.put(`${AppConstants.UPDATE_ENGINE_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteEngineById(id: number){
    return this.http.delete(`${AppConstants.DELETE_ENGINE_BY_ID}${id}`, {withCredentials: true});
  }
}
