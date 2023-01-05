import {Injectable} from '@angular/core';
import {User} from "../classes/user";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppConstants} from "../../AppConstants";
import {BehaviorSubject, Observable, Subject} from "rxjs";

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

    return this.http.post(AppConstants.LOGIN_USER_API, this.formData, {
      responseType: "json",
      observe: "response",
    });
  }

  changeIsAuth(val: boolean){
    this._isAuthenticated.next(val);
  }

  logout(){
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
}
