import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUtil} from '../app.util';
import {Car, CarDTO} from '@classes/car';
import {mapToCar} from '../app.mappers';
import {ISearchParameters} from '@search-page/search-page.component';

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

  getById(carId: number): Observable<Car> {
    return this._http.get<any>(`${AppConstants.CAR_URL}/${carId}`).pipe(
      map((response: any) => mapToCar(response))
    );
  }

  getAllColor(): Observable<{ color: string }[]> {
    return this._http.get<{ color: string }[]>(`${AppConstants.CAR_URL}/colors`);
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
      if (params[key] !== null) {
        paramsString += `${AppUtil.toSnakeCase(key)}=${value}&`;
      }
    });

    return this._http.get<Car[]>(`${AppConstants.SEARCH_URL}/normal?${paramsString}`).pipe(
      map((response: Car[]) => response.map(mapToCar))
    );
  }

  getByUserId(userId: number): Observable<Car[]> {
    return this._http.get<any[]>(`${AppConstants.USER_URL}/${userId}/cars`).pipe(
      map((response: any[]) => response.map(mapToCar))
    );
  }

  uploadImages(carId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });
    return this._http.post(`${AppConstants.CAR_URL}/${carId}/images`, formData);
  }

}
