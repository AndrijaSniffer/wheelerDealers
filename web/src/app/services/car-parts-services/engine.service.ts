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
    return this.http.get(`${AppConstants.GET_ENGINE_BY_ID}/${id}`);
  }

  createEngine(et: Engine){
    let object: any = {}

    for (const [key, value] of Object.entries(et)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_ENGINE, JSON.stringify(object), {withCredentials: true});
  }

  updateEngine(id: number, engine: Engine) {
    let object: any = {}

    for (const [key, value] of Object.entries(engine)) {
      object[key] = value;
    }

    object["id"] = id;

    return this.http.put(`${AppConstants.UPDATE_ENGINE_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteEngineById(id: number){
    return this.http.delete(`${AppConstants.DELETE_ENGINE_BY_ID}/${id}`, {withCredentials: true});
  }
}
