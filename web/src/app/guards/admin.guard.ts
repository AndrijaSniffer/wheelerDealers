import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppUser} from '../app.user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private readonly _router: Router = inject(Router);
  private readonly _appUser: AppUser = inject(AppUser);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._appUser.user && this._appUser.user.isSuperuser) {
      return true;
    } else {
      this._router.navigate(['/']).then(_ => {
      });
      return false;
    }
  }
}
