import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Car, CarDTO} from '../classes/car';
import {mapToCar} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Car[]> {
    return this._http.get<any[]>(AppConstants.CAR_URL).pipe(
      map((response: any[]) => response.map(mapToCar))
    );
  }

  create(car: CarDTO): Observable<Car> {
    return this._http.post<Car>(AppConstants.CAR_URL, AppUtil.fromClassToFormData(car));
  }

  update(car: CarDTO): Observable<Car> {
    return this._http.put<Car>(`${AppConstants.CAR_URL}/${car.id}`, AppUtil.fromClassToFormData(car));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.CAR_URL}/${id}`);
  }
}
