import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) {
  }

  // refreshToken(): Observable<string> {
  //   return this.client.post<{ access_token: string }>(AppConstants.REFRESH_TOKEN, {
  //     refresh: this.refreshAuthToken()
  //   }).pipe(
  //     map(response => response.access_token)
  //   );
  // }

  getAuthToken() {
    return sessionStorage.getItem("access");
  }

  refreshAuthToken() {
    return sessionStorage.getItem("refresh");
  }

  logout() {
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
  }
}
