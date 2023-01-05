export class AppConstants{
  public static TOKEN_EXCLUSIONS = [
    "/wheelerDealersApi/api/user/create",
    "/wheelerDealersApi/api/token"
  ]
  public static API_ENDPOINT = "http://127.0.0.1:8000/wheelerDealersApi"

  public static REGISTER_USER_API = `${AppConstants.API_ENDPOINT}/api/user/create`;
  public static LOGIN_USER_API = `${AppConstants.API_ENDPOINT}/api/token/`;

}
