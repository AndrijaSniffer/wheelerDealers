import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AppUser} from '../app.user';
import {AuthService} from '@services/auth.service';
import {AppUtil} from '../app.util';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appUser = inject(AppUser);
  const authService = inject(AuthService);

  const needsSlash = req.params.keys().length === 0 && !req.url.endsWith('/');
  const normalizedUrl = needsSlash ? `${req.url}/` : req.url;

  const token = appUser.tokens?.access;

  if (!token) {
    return next(req.clone({ url: normalizedUrl }));
  }

  if (Date.now() > appUser.tokenExpiration * 1000) {
    return authService.refreshUserSession(appUser.tokens.refresh).pipe(
      switchMap(jwtTokens => {
        appUser.tokens = jwtTokens;
        appUser.tokenExpiration = AppUtil.decodeJWTAccessToken(jwtTokens.access).exp;
        sessionStorage.setItem('tokens', JSON.stringify(appUser.tokens));
        sessionStorage.setItem('user', JSON.stringify(appUser.user));

        return next(req.clone({
          setHeaders: { Authorization: `Bearer ${jwtTokens.access}` },
          url: normalizedUrl
        }));
      }),
      catchError(err => {
        console.error(err.message);
        appUser.logout();
        return throwError(() => err);
      })
    );
  } else {
    return next(req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      url: normalizedUrl
    }));
  }
};
