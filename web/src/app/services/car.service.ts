import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Car, CarDTO} from '../classes/car';
import {mapToCar} from '../app.mappers';
import {ISearchParameters} from '../components/search-page/search-page.component';

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

  getAllColor(): Observable<{color: string}[]> {
    return this._http.get<{color: string}[]>(`${AppConstants.CAR_URL}/colors`);
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

  parametrizedSearch(params: ISearchParameters): Observable<Car[]> {
    let paramsString: string = '';
    Object.entries(params).map(([key, value]) => {
      if (params[key] !== null){
        paramsString += `${AppUtil.toSnakeCase(key)}=${value}&`;
      }
    });

    console.warn(paramsString);

    return this._http.get<Car[]>(`${AppConstants.SEARCH_URL}/normal?${paramsString}`).pipe(
      map((response: Car[]) => response.map(mapToCar))
    );
  }
}
