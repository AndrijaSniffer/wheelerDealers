import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {EngineType} from '@classes/engine-type';
import {AppConstants} from '../app.constants';
import {mapToEngineType} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class EngineTypeService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<EngineType[]> {
    return this._http.get<any[]>(AppConstants.ENGINE_TYPE_URL).pipe(
      map((response: any[]) => response.map(mapToEngineType))
    );
  }

  create(engineType: EngineType): Observable<EngineType> {
    return this._http.post<EngineType>(AppConstants.ENGINE_TYPE_URL, engineType);
  }

  update(engineType: EngineType): Observable<EngineType> {
    return this._http.put<EngineType>(`${AppConstants.ENGINE_TYPE_URL}/${engineType.id}`, engineType);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.ENGINE_TYPE_URL}/${id}`);
  }
}
