import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {TransmissionType} from '../classes/transmissionType';
import {mapToTransmissionType} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class TransmissionTypeService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<TransmissionType[]> {
    return this._http.get<any[]>(AppConstants.TRANSMISSION_URL).pipe(
      map((response: any[]) => response.map(mapToTransmissionType))
    );
  }

  create(transmission: TransmissionType): Observable<TransmissionType> {
    return this._http.post<TransmissionType>(AppConstants.TRANSMISSION_URL, AppUtil.fromClassToFormData(transmission));
  }

  update(transmission: TransmissionType): Observable<TransmissionType> {
    return this._http.put<TransmissionType>(`${AppConstants.TRANSMISSION_URL}/${transmission.id}`, AppUtil.fromClassToFormData(transmission));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.TRANSMISSION_URL}/${id}`);
  }
}
