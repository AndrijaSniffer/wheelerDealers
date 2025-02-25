import { HttpInterceptorFn } from '@angular/common/http';
import {AppConstants} from '../app.constants';
import {inject} from '@angular/core';
import {AppUser} from '../app.user';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appUser = inject(AppUser);
  const excludedUrls = [
    AppConstants.LOGIN_URL,
    AppConstants.REGISTER_USER,
    AppConstants.REGISTER_COMPANY
  ]; // URLs to exclude from attaching the token.

  // Check if the request URL matches any of the excluded URLs.
  const isExcluded = excludedUrls.some(url => req.url === url);

  // console.warn(isExcluded);

  if (!isExcluded) {
    const token = appUser.tokens.access; // Token from the currently logged-in user.
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req);
};
