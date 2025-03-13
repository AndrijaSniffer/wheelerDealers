import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Fuel} from '../classes/fuel';
import {mapToFuel} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Fuel[]> {
    return this._http.get<any[]>(AppConstants.FUEL_URL).pipe(
      map((response: any[]) => response.map(mapToFuel))
    );
  }

  create(fuel: Fuel): Observable<Fuel> {
    return this._http.post<Fuel>(AppConstants.FUEL_URL, AppUtil.fromClassToFormData(fuel));
  }

  update(fuel: Fuel): Observable<Fuel> {
    return this._http.put<Fuel>(`${AppConstants.FUEL_URL}/${fuel.id}`, AppUtil.fromClassToFormData(fuel));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.FUEL_URL}/${id}`);
  }
}
