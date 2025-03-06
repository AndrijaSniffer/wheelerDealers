import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http = inject(HttpClient)

  getUserById(userId: number): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this._http.get((AppConstants.GET_USER_BY_ID + `/${userId.toString()}`)).subscribe({
        next: (response: JSON) => {
          console.warn(response);
          resolve(response);
        },
        error: error => {
          reject(error);
        }
      })
    })
  }
}
