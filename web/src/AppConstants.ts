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

}
