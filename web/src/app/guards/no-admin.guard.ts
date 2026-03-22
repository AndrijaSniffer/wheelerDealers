import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppUser} from '../app.user';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanActivate {
  private readonly _router: Router = inject(Router);
  private readonly _appUser: AppUser = inject(AppUser);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._appUser.user) {
      if (this._appUser.user.isSuperuser) {
        this._router.navigate(['admin/countryManagement']).then(_ => {});
        return false;
      }
      if (this._appUser.user.PIB !== null) {
        this._router.navigate(['dealership/dashboard']).then(_ => {});
        return false;
      }
    }
    return true;
  }
}
