import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Transmission} from '../classes/transmission';
import {mapToTransmission} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Transmission[]> {
    return this._http.get<any[]>(AppConstants.TRANSMISSION_URL).pipe(
      map((response: any[]) => response.map(mapToTransmission))
    );
  }

  create(transmission: Transmission): Observable<Transmission> {
    return this._http.post<Transmission>(AppConstants.TRANSMISSION_URL, AppUtil.fromClassToFormData(transmission));
  }

  update(transmission: Transmission): Observable<Transmission> {
    return this._http.put<Transmission>(`${AppConstants.TRANSMISSION_URL}/${transmission.id}`, AppUtil.fromClassToFormData(transmission));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.TRANSMISSION_URL}/${id}`);
  }
}
