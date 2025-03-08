import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../classes/country';
import {AppConstants} from '../app.constants';
import {map, Observable} from 'rxjs';
import {mapToCountry} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Country[]> {
    return this._http.get<any[]>(AppConstants.COUNTRY_URL)
      .pipe(
        map((response: any[]) => response.map(mapToCountry))
      );
  }

  create(country: Country): Observable<Country> {
    return this._http.post<Country>(`${AppConstants.COUNTRY_URL}/`, country);
  }

  update(country: Country): Observable<Country> {
    return this._http.put<Country>(AppConstants.COUNTRY_URL, country);
  }

  delete(id: number): Observable<Country> {
    return this._http.delete<any>(AppConstants.COUNTRY_URL + `/${id}`);
  }
}
