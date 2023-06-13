import {Injectable} from '@angular/core';
import {User} from "../classes/user";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppConstants, jwtTokens} from "../../AppConstants";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: FormData;
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated: Observable<boolean>;
  currentUser: User | null;

  constructor(private http: HttpClient) {
    this.isAuthenticated = this._isAuthenticated.asObservable();
  }

  loginUser(username: string, password: string): Observable<HttpResponse<any>> {
    this.formData = new FormData();

    this.formData.append("username", username);
    this.formData.append("password", password);

    let object: any = {};

    this.formData.forEach(function (value, key) {
      object[key] = value;
    });

    const json = JSON.stringify(object);
    const header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(AppConstants.LOGIN_USER_API, json, {
      responseType: "json",
      observe: "response",
      headers: header
    });
  }

  changeIsAuth(val: boolean) {
    this._isAuthenticated.next(val);
  }

  logout() {
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('access');
    this.currentUser = null;

    this.changeIsAuth(false);
  }

  registerUser(user: User): Observable<HttpResponse<any>> {
    this.formData = new FormData();

    this.formData.append("username", user.username);
    this.formData.append("email", user.email);
    this.formData.append("firstName", user.firstName);
    this.formData.append("lastName", user.lastName);
    this.formData.append('password', user.password!);

    return this.http.post(AppConstants.REGISTER_USER_API, this.formData, {
      responseType: "text",
      observe: "response"
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_USER_API);
  }

  parseJwtToUser(jwtToken: jwtTokens | null) {
    let authUser;
    if (jwtToken) {
      authUser = JSON.parse(atob(jwtToken.access.split('.')[1]));
    } else {
      authUser = JSON.parse(atob(sessionStorage.getItem('access')!.split('.')[1]));
    }

    this.currentUser = {
      username: authUser.username,
      email: authUser.email,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      isAdmin: authUser.role.authority === 'admin'
    };
  }
}
