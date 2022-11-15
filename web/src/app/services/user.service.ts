import {Injectable} from '@angular/core';
import {User} from "../classes/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AppConstants} from "../../AppConstants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: FormData = new FormData()

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<HttpResponse<any>> {
    this.formData.append("username", "HondaCivic");
    this.formData.append("email", user.email);
    this.formData.append("firstName", user.firstName);
    this.formData.append("lastName", user.lastName);
    this.formData.append('password', user.password);

    return this.http.post(AppConstants.REGISTER_USER_API, this.formData, {responseType: "text", observe: "response"});
  }
}
