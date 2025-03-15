import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Engine, EngineDTO} from '../classes/engine';
import {mapToEngine} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Engine[]> {
    return this._http.get<any[]>(AppConstants.ENGINE_URL).pipe(
      map((response: any[]) => response.map(mapToEngine))
    );
  }

  create(engine: EngineDTO): Observable<Engine> {
    return this._http.post<Engine>(AppConstants.ENGINE_URL, AppUtil.fromClassToFormData(engine));
  }

  update(engine: EngineDTO): Observable<Engine> {
    return this._http.put<Engine>(`${AppConstants.ENGINE_URL}/${engine.id}`, AppUtil.fromClassToFormData(engine));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.ENGINE_URL}/${id}`);
  }
}
