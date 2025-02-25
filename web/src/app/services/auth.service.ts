import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from '../app.constants';
import {NotificationService} from './notification.service';
import {jwtDecode} from 'jwt-decode';
import {AppUser} from '../app.user';
import {UserService} from './user.service';
import {Company} from '../classes/company';
import {User} from '../classes/user';
import {AppUtil} from '../app.util';

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

  registerCompany(company: Company, logoFile: File): Promise<boolean | string> {
    const companyFormData = new FormData();
    companyFormData.append('PIB', company.PIB.toString()); // Append the PIB field
    companyFormData.append('address', company.address); // Append the address field
    companyFormData.append('phone', company.phone.toString()); // Append the phone field
    companyFormData.append('logo', logoFile); // Append the logo file
    companyFormData.append('website_url', company.websiteUrl); // Append the website URL

    return new Promise((resolve, _) => {
      this._http.post<JSON>(AppConstants.REGISTER_COMPANY, companyFormData).subscribe({
        next: async (response: JSON) => {
          resolve(response['logo_url']);
        },
        error: err => {
          console.error(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              this._notification.showTimedNotification(err.error.detail);
            }
          }
          resolve(false);
        }
      })
    })
  }

  registerUser(user: User): Promise<boolean> {
    const userFormData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (key === 'PIB' && value !== null) {
        userFormData.append('PIB', (value as Company).PIB.toString());
      } else {
        userFormData.append(AppUtil.toSnakeCase(key), value);
      }
    });

    return new Promise((resolve, _) => {
      this._http.post<JSON>(AppConstants.REGISTER_USER, userFormData).subscribe({
        next: async (_: JSON) => {
          resolve(true);
        },
        error: err => {
          console.error(err);
          console.error(err.error);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              const errorMessages = AppUtil.parseJsonErrorsToString(err.error);
              this._notification.showTimedErrorNotification(errorMessages);
            }
          }
          resolve(false);
        }
      })
    })
  }
}
