export class AppConstants {
  public static TOKEN_EXCLUSIONS = [
    "/wheelerDealersApi/api/user/create",
    "/wheelerDealersApi/api/token"
  ];
  public static API_ENDPOINT = "http://127.0.0.1:8000/wheelerDealersApi/";

  public static REGISTER_USER_API = `${AppConstants.API_ENDPOINT}api/user/create`;
  public static GET_ALL_USER_API = `${AppConstants.API_ENDPOINT}api/user`;
  public static LOGIN_USER_API = `${AppConstants.API_ENDPOINT}api/token/`;
  public static REFRESH_TOKEN = `${AppConstants.API_ENDPOINT}api/token/refresh/`;

  //COUNTRY
  public static GET_ALL_COUNTRY = `${AppConstants.API_ENDPOINT}countries`;
  public static CREATE_COUNTRY = `${AppConstants.GET_ALL_COUNTRY}/`;
  public static GET_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}/`;
  public static UPDATE_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}/`;
  public static DELETE_COUNTRY_BY_ID = `${AppConstants.GET_ALL_COUNTRY}/`;

  //DRIVE
  public static GET_ALL_DRIVE = `${AppConstants.API_ENDPOINT}drives`;
  public static GET_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}/`;
  public static CREATE_DRIVE = `${AppConstants.GET_ALL_DRIVE}/`;
  public static UPDATE_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}/`;
  public static DELETE_DRIVE_BY_ID = `${AppConstants.GET_ALL_DRIVE}/`;

  //Engine type
  public static GET_ALL_ENGINE_TYPE = `${AppConstants.API_ENDPOINT}engineTypes`;
  public static GET_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}/`;
  public static CREATE_ENGINE_TYPE = `${AppConstants.GET_ALL_ENGINE_TYPE}/`;
  public static UPDATE_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}/`;
  public static DELETE_ENGINE_TYPE_BY_ID = `${AppConstants.GET_ALL_ENGINE_TYPE}/`;

  //Engine
  public static GET_ALL_ENGINE = `${AppConstants.API_ENDPOINT}getAllEngine`;
  public static GET_ENGINE_BY_ID = `${AppConstants.API_ENDPOINT}engines/`;
  public static CREATE_ENGINE = `${AppConstants.API_ENDPOINT}engines/`;
  public static UPDATE_ENGINE_BY_ID = `${AppConstants.API_ENDPOINT}engines/`;
  public static DELETE_ENGINE_BY_ID = `${AppConstants.API_ENDPOINT}engines/`;

  //Fuel
  public static GET_ALL_FUEL = `${AppConstants.API_ENDPOINT}fuels`;
  public static GET_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}/`;
  public static CREATE_FUEL = `${AppConstants.GET_ALL_FUEL}/`;
  public static UPDATE_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}/`;
  public static DELETE_FUEL_BY_ID = `${AppConstants.GET_ALL_FUEL}/`;

  public static GET_ALL_INTERIOR = `${AppConstants.API_ENDPOINT}interiors`;
  public static GET_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}/`;
  public static CREATE_INTERIOR = `${AppConstants.GET_ALL_INTERIOR}/`;
  public static UPDATE_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}/`;
  public static DELETE_INTERIOR_BY_ID = `${AppConstants.GET_ALL_INTERIOR}/`;

  public static GET_ALL_TRANSMISSION = `${AppConstants.API_ENDPOINT}transmissions`;
  public static GET_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}/`;
  public static CREATE_TRANSMISSION = `${AppConstants.GET_ALL_TRANSMISSION}/`;
  public static UPDATE_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}/`;
  public static DELETE_TRANSMISSION_BY_ID = `${AppConstants.GET_ALL_TRANSMISSION}/`;
}
