import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {ModelType} from '../classes/model-type';
import {mapToModelType} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class ModelTypeService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<ModelType[]> {
    return this._http.get<any[]>(AppConstants.MODEL_TYPE_URL).pipe(
      map((response: any[]) => response.map(mapToModelType))
    );
  }

  create(modelType: ModelType): Observable<ModelType> {
    return this._http.post<ModelType>(AppConstants.MODEL_TYPE_URL, AppUtil.fromClassToFormData(modelType));
  }

  update(modelType: ModelType): Observable<ModelType> {
    return this._http.put<ModelType>(`${AppConstants.MODEL_TYPE_URL}/${modelType.id}`, AppUtil.fromClassToFormData(modelType));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.MODEL_TYPE_URL}/${id}`);
  }
}
