import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AppConstants} from "../../AppConstants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getAuthToken();
    let excludedUrl = false;

    AppConstants.TOKEN_EXCLUSIONS.forEach(url => {
      if(url == request.url){
        excludedUrl = true;
      }
    })

    // console.warn(request, request.url);
    if (token != null && !excludedUrl) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      return request;
    }
  }
}
