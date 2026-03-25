import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {EmissionClass} from '@classes/emission-class';
import {mapToEmissionClass} from '../app.mappers';
import {AppUtil} from '../app.util';

@Injectable({
  providedIn: 'root'
})
export class EmissionClassService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<EmissionClass[]> {
    return this._http.get<any[]>(AppConstants.EMISSION_CLASS_URL).pipe(
      map((response: any[]) => response.map(mapToEmissionClass))
    );
  }

  create(emissionClass: EmissionClass): Observable<EmissionClass> {
    return this._http.post<EmissionClass>(AppConstants.EMISSION_CLASS_URL, AppUtil.fromClassToFormData(emissionClass));
  }

  update(emissionClass: EmissionClass): Observable<EmissionClass> {
    return this._http.put<EmissionClass>(`${AppConstants.EMISSION_CLASS_URL}/${emissionClass.id}`, AppUtil.fromClassToFormData(emissionClass));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.EMISSION_CLASS_URL}/${id}`);
  }
}
