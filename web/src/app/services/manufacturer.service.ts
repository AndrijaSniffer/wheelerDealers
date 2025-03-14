import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {Manufacturer, ManufacturerDTO} from '../classes/manufacturer';
import {mapToManufacturer} from '../app.mappers';
import {AppUtil} from '../app.util';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Manufacturer[]> {
    return this._http.get<any[]>(AppConstants.MANUFACTURER_URL).pipe(
      map((response: any[]) => response.map(mapToManufacturer))
    );
  }

  create(manufacturer: ManufacturerDTO): Observable<Manufacturer> {
    return this._http.post<Manufacturer>(AppConstants.MANUFACTURER_URL, AppUtil.fromClassToFormData(manufacturer));
  }

  update(manufacturer: ManufacturerDTO): Observable<Manufacturer> {
    return this._http.put<Manufacturer>(`${AppConstants.MANUFACTURER_URL}/${manufacturer.id}`, AppUtil.fromClassToFormData(manufacturer));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.MANUFACTURER_URL}/${id}`);
  }
}
