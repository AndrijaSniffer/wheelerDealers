import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {

  static readonly SERVER_URL = 'http://localhost:8000/wheelerDealersApi/';

  static readonly LOGIN_URL = AppConstants.SERVER_URL + 'api/auth/login';

  static readonly REFRESH_URL = AppConstants.SERVER_URL + 'api/token/refresh';

  static readonly USER_URL = AppConstants.SERVER_URL + 'api/auth/user';

  static readonly BAN_USER_URL = AppConstants.SERVER_URL + 'api/auth/user/ban';

  static readonly USERS_URL = AppConstants.SERVER_URL + 'api/auth/users';

  static readonly REGISTER_USER = AppConstants.SERVER_URL + 'api/auth/create';

  static readonly REGISTER_COMPANY = AppConstants.SERVER_URL + 'api/company';

  static readonly COMPANY_URL = AppConstants.SERVER_URL + 'company';

  static readonly COUNTRY_URL = AppConstants.SERVER_URL + 'country';

  static readonly ENGINE_TYPE_URL = AppConstants.SERVER_URL + 'engineType';

  static readonly EMISSION_CLASS_URL = AppConstants.SERVER_URL + 'emissionClass';

  static readonly MODEL_TYPE_URL = AppConstants.SERVER_URL + 'modelType';

  static readonly TRANSMISSION_URL = AppConstants.SERVER_URL + 'transmissionType';

  static readonly FUEL_URL = AppConstants.SERVER_URL + 'fuel';

  static readonly INTERIOR_URL = AppConstants.SERVER_URL + 'interior';

  static readonly DRIVETRAINS_URL = AppConstants.SERVER_URL + 'drivetrain';

  static readonly MANUFACTURER_URL = AppConstants.SERVER_URL + 'manufacturer';

  static readonly ENGINE_URL = AppConstants.SERVER_URL + 'engine';

  static readonly MODEL_URL = AppConstants.SERVER_URL + 'model';

  static readonly MODEL_BY_MANUFACTURER_ID = AppConstants.MODEL_URL + '/byManufacturerId';

  static readonly CAR_URL = AppConstants.SERVER_URL + 'car';

  static readonly CAR_COLORS_URL = AppConstants.CAR_URL + '/colors';

  static readonly SEARCH_URL = AppConstants.SERVER_URL + 'search';

  static readonly UPDATE_USER_URL = AppConstants.USER_URL;

}
