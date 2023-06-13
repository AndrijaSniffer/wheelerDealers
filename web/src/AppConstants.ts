export class Search {
  idManufacturer?: number;
  idModel?: number;
  idTransmission?: number;
  idFuel?: number;
  idDrive?: number;
  isPreowned?: boolean;
  priceFrom?: number;
  priceTo?: number;
  volume?: number;
  hpFrom?: number;
  hpTo?: number;
  kwFrom?: number;
  kwTo?: number;
  carColor?: string;
  leftSideSteeringWheel?: boolean;
}

export interface jwtTokens {
  refresh: string | null;
  access: string;
}

export class AppConstants {
  public static TOKEN_EXCLUSIONS = [
    "/wheelerDealersApi/api/auth/signup",
    "/wheelerDealersApi/api/auth/signin"
  ];
  public static API_ENDPOINT = "http://localhost:8080/wheelerDealersApi/";

  public static REGISTER_USER_API = `${AppConstants.API_ENDPOINT}api/auth/signup`;
  public static GET_ALL_USER_API = `${AppConstants.API_ENDPOINT}api/auth/users`;
  public static LOGIN_USER_API = `${AppConstants.API_ENDPOINT}api/auth/signin`;
  // public static REFRESH_TOKEN = `${AppConstants.API_ENDPOINT}api/token/refresh/`;

  public static DEFAULT_SEARCH = `${AppConstants.API_ENDPOINT}search`;
  public static NORMAL_SEARCH = `${AppConstants.API_ENDPOINT}search`;

  //COUNTRY
  public static GET_ALL_COUNTRY = `${AppConstants.API_ENDPOINT}countries`;
  public static CREATE_COUNTRY = `${AppConstants.GET_ALL_COUNTRY}`;
  public static GET_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}`;
  public static UPDATE_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}`;
  public static DELETE_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}`;

  //DRIVE
  public static GET_ALL_DRIVE = `${AppConstants.API_ENDPOINT}drives`;
  public static GET_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}`;
  public static CREATE_DRIVE = `${AppConstants.GET_ALL_DRIVE}`;
  public static UPDATE_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}`;
  public static DELETE_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}`;

  //Engine type
  public static GET_ALL_ENGINE_TYPE = `${AppConstants.API_ENDPOINT}engine-types`;
  public static GET_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}`;
  public static CREATE_ENGINE_TYPE = `${AppConstants.GET_ALL_ENGINE_TYPE}`;
  public static UPDATE_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}`;
  public static DELETE_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}`;

  //Engine
  public static GET_ALL_ENGINE = `${AppConstants.API_ENDPOINT}engines`;
  public static GET_ENGINE_BY_ID = `${AppConstants.GET_ALL_ENGINE}`;
  public static CREATE_ENGINE = `${AppConstants.GET_ALL_ENGINE}`;
  public static UPDATE_ENGINE_BY_ID = `${AppConstants.GET_ALL_ENGINE}`;
  public static DELETE_ENGINE_BY_ID = `${AppConstants.GET_ALL_ENGINE}`;

  //Fuel
  public static GET_ALL_FUEL = `${AppConstants.API_ENDPOINT}fuel`;
  public static GET_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}`;
  public static CREATE_FUEL = `${AppConstants.GET_ALL_FUEL}`;
  public static UPDATE_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}`;
  public static DELETE_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}`;

  public static GET_ALL_INTERIOR = `${AppConstants.API_ENDPOINT}interiors`;
  public static GET_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}`;
  public static CREATE_INTERIOR = `${AppConstants.GET_ALL_INTERIOR}`;
  public static UPDATE_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}`;
  public static DELETE_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}`;

  public static GET_ALL_TRANSMISSION = `${AppConstants.API_ENDPOINT}transmissions`;
  public static GET_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}`;
  public static CREATE_TRANSMISSION = `${AppConstants.GET_ALL_TRANSMISSION}`;
  public static UPDATE_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}`;
  public static DELETE_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}`;

  public static GET_ALL_MANUFACTURER = `${AppConstants.API_ENDPOINT}manufacturers`;
  public static GET_MANUFACTURER_BY_ID = `${AppConstants.GET_ALL_MANUFACTURER}`;
  public static CREATE_MANUFACTURER = `${AppConstants.GET_ALL_MANUFACTURER}`;
  public static UPDATE_MANUFACTURER_BY_ID = `${AppConstants.GET_ALL_MANUFACTURER}`;
  public static DELETE_MANUFACTURER_BY_ID = `${AppConstants.GET_ALL_MANUFACTURER}`;

  public static GET_ALL_MODEL_TYPE = `${AppConstants.API_ENDPOINT}modelTypes`;
  public static GET_MODEL_TYPE_BY_ID = `${AppConstants.GET_ALL_MODEL_TYPE}`;
  public static CREATE_MODEL_TYPE = `${AppConstants.GET_ALL_MODEL_TYPE}`;
  public static UPDATE_MODEL_TYPE_BY_ID = `${AppConstants.GET_ALL_MODEL_TYPE}`;
  public static DELETE_MODEL_TYPE_BY_ID = `${AppConstants.GET_ALL_MODEL_TYPE}`;

  public static GET_ALL_MODEL = `${AppConstants.API_ENDPOINT}models`;
  public static GET_MODEL_BY_ID = `${AppConstants.GET_ALL_MODEL}`;
  public static CREATE_MODEL = `${AppConstants.GET_ALL_MODEL}`;
  public static UPDATE_MODEL_BY_ID = `${AppConstants.GET_ALL_MODEL}`;
  public static DELETE_MODEL_BY_ID = `${AppConstants.GET_ALL_MODEL}`;
}
