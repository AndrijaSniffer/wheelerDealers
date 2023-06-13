import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AppConstants} from "../../AppConstants";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError(err => {
        if (err.status == 401 && (sessionStorage.getItem('access') && sessionStorage.getItem('refresh'))) {
          // return this._authService.refreshToken().pipe(
          //   catchError(() => {
          //     this._authService.logout();
          //     this.router.navigate(['**'])
          //     return throwError(err);
          //   }),
          //   switchMap(() => next.handle(request))
          // );
          this._authService.logout();
          this.router.navigate(["/"])
        }
        return throwError(err);
      })
    ) as Observable<HttpEvent<any>>;
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this._authService.getAuthToken();
    let excludedUrl = false;

    AppConstants.TOKEN_EXCLUSIONS.forEach(url => {
      if (url == request.url) {
        excludedUrl = true;
      }
    })

    // console.warn(request, request.url);
    if (token != null && !excludedUrl) {
      return request.clone({
        headers: request.headers.set('Content-Type', 'application/json; charset=utf-8'),
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else if (!excludedUrl) {
      return request.clone({
        headers: request.headers.set('Content-Type', 'application/json; charset=utf-8')
      });
    } else {
      return request;
    }
  }
}
