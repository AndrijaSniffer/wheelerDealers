import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app.constants';
import {map, Observable} from 'rxjs';
import {User} from '../classes/user';
import {mapToUser} from '../app.mappers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http = inject(HttpClient)

  getUserById(userId: number): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this._http.get((AppConstants.USER_URL + `/${userId}`)).subscribe({
        next: (response: JSON) => {
          resolve(response);
        },
        error: error => {
          reject(error);
        }
      })
    })
  }

  getAll(): Observable<User[]> {
    return this._http.get<any[]>(AppConstants.USERS_URL)
      .pipe(
        map((response: any[]) => response.map(mapToUser))
      );
  }

  banUserById(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this._http.put<any>(`${AppConstants.BAN_USER_URL}`, formData);
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this._http.put<any>(`${AppConstants.USER_URL}/${userId}/update`, data);
  }

}
