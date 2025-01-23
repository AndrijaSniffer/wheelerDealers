import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from '../app.constants';
import {NotificationService} from './notification.service';
import {jwtDecode} from 'jwt-decode';
import {AppUser} from '../app.user';
import {UserService} from './user.service';

export interface JWToken {
  refresh: string,
  access: string
}

export interface AccessToken {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient)
  private readonly _notification = inject(NotificationService)
  private readonly _appUser = inject(AppUser)
  private readonly _userService = inject(UserService)

  login(username: string, password: string): Promise<boolean> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return new Promise((resolve, _) => {
      this._http.post<JWToken>(AppConstants.LOGIN_URL, formData).subscribe(
        {
          next: async (response: JWToken) => {
            // console.log(response);
            let accessToken = response.access

            try {
              // console.warn(jwtDecode(accessToken));
              let decodedToken = jwtDecode(accessToken) as AccessToken;
              this._appUser.tokens = {refresh: response.refresh, access: response.access};
              this._appUser.tokenExpiration = decodedToken.exp;
              this._appUser.user = await this._userService.getUserById(decodedToken.user_id);
              this._appUser.setLoggedIn(true);

              resolve(true);

            } catch (error) {
              console.error(error);
              resolve(false);
            }
          },
          error: err => {
            console.error(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._notification.showTimedNotification(err.error.detail);
              }
            }
            resolve(false);
          }
        }
      )
    })
  }
}
