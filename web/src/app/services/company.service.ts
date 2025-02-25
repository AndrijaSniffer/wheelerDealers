import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly _http = inject(HttpClient)

  getAll(){
    return new Promise<JSON>((resolve, reject) => {
      this._http.get<JSON>(AppConstants.COMPANY_URL).subscribe({
        next: async (response: JSON) => {
          resolve(response);
        },
        error: err => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  getCompanyByPIB(PIB: number){
    return new Promise<JSON>((resolve, reject) => {
      this._http.get<JSON>(AppConstants.COMPANY_URL + `/${PIB}`).subscribe({
        next: async (response: JSON) => {
          resolve(response);
        },
        error: err => {
          console.error(err);
          reject(err);
        }
      });
    });
  }
}
