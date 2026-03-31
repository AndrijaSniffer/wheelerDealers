import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Model, ModelDTO} from '@classes/model';
import {mapToModel} from '../app.mappers';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Model[]> {
    return this._http.get<any[]>(AppConstants.MODEL_URL).pipe(
      map((response: any[]) => response.map(mapToModel))
    );
  }

  getByManufacturerId(manufacturerId: number): Observable<Model[]> {
    return this._http.get<any>(AppConstants.MODEL_BY_MANUFACTURER_ID, {params: {manufacturer_id: manufacturerId}}).pipe(
      map((response: any[]) => response.map(mapToModel))
    )
  }

  create(model: ModelDTO): Observable<Model> {
    return this._http.post<Model>(AppConstants.MODEL_URL, AppUtil.fromClassToFormData(model));
  }

  update(model: ModelDTO): Observable<Model> {
    return this._http.put<Model>(`${AppConstants.MODEL_URL}/${model.id}`, AppUtil.fromClassToFormData(model));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.MODEL_URL}/${id}`);
  }
}
