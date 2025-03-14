import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Interior} from '../classes/interior';
import {mapToInterior} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class InteriorService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Interior[]> {
    return this._http.get<any[]>(AppConstants.INTERIOR_URL).pipe(
      map((response: any[]) => response.map(mapToInterior))
    );
  }

  create(interior: Interior): Observable<Interior> {
    return this._http.post<Interior>(AppConstants.INTERIOR_URL, AppUtil.fromClassToFormData(interior));
  }

  update(interior: Interior): Observable<Interior> {
    return this._http.put<Interior>(`${AppConstants.INTERIOR_URL}/${interior.id}`, AppUtil.fromClassToFormData(interior));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.INTERIOR_URL}/${id}`);
  }
}
