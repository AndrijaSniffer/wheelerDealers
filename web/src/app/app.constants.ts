import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {

  static readonly SERVER_URL = 'http://localhost:8000/wheelerDealersApi/';

  static readonly LOGIN_URL = AppConstants.SERVER_URL + 'api/auth/login';

  static readonly GET_USER_BY_ID = AppConstants.SERVER_URL + 'api/auth/user/';

  static readonly REGISTER_USER = AppConstants.SERVER_URL + 'api/auth/create/';

}
