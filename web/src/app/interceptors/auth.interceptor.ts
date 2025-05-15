import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AppConstants} from '../app.constants';
import {AppUser} from '../app.user';
import {AuthService} from '../services/auth.service';
import {AppUtil} from '../app.util';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appUser = inject(AppUser);
  const authService = inject(AuthService);
  const excludedTokenUrls = [
    AppConstants.LOGIN_URL,
    AppConstants.REGISTER_USER,
    AppConstants.REGISTER_COMPANY,
    AppConstants.REFRESH_URL,
    AppConstants.MODEL_BY_MANUFACTURER_ID,
    AppConstants.CAR_COLORS_URL
  ];
  const excludedSlashUrls = Array.from(excludedTokenUrls);
  excludedSlashUrls.push(AppConstants.USER_URL);

  const shouldAppendSlash = (!excludedSlashUrls.some(url => req.url.startsWith(url)));

  // Skip token logic for excluded URLs
  if (excludedTokenUrls.some(url => req.url === url)) {
    return next(req);
  }

  const token = appUser.tokens?.access;
  if (!token) {
    return next(req); // No token available, proceed without Authorization header
  }
  // console.warn(req.method, req.url, req.headers);
  // Check if token is expired
  if (Date.now() > appUser.tokenExpiration * 1000) {
    return authService.refreshUserSession(appUser.tokens.refresh).pipe(
      switchMap(jwtTokens => {
        // Update appUser with new tokens and expiration
        appUser.tokens = jwtTokens;
        appUser.tokenExpiration = AppUtil.decodeJWTAccessToken(jwtTokens.access).exp;

        sessionStorage.setItem('tokens', JSON.stringify(appUser.tokens));
        sessionStorage.setItem('user', JSON.stringify(appUser.user));

        // Clone request with new token
        const authReq = req.clone({
          setHeaders: {Authorization: `Bearer ${jwtTokens.access}`},
          url: shouldAppendSlash ? `${req.url}/` : req.url
        });
        return next(authReq);
      }),
      catchError(err => {
        console.error(err.message);
        appUser.logout();
        return throwError(() => err); // Propagate error to trigger app-level handling
      })
    );
  } else {
    // Clone request with current token
    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
      url: shouldAppendSlash ? `${req.url}/` : req.url
    });
    return next(authReq);
  }
};
