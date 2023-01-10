import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._userService.currentUser == null) {
      if (sessionStorage.getItem('access') != null &&
        sessionStorage.getItem('refresh') != null) {
        let tmpUser = JSON.parse(atob(sessionStorage.getItem('access')!.split('.')[1])) as User;

        if (!tmpUser.isAdmin) {
          this._router.navigate(['**']);
          return false;
        } else {
          return true;
        }
      } else {

        this._router.navigate(['**']);
        return false;
      }
    } else if (this._userService.currentUser!.isAdmin == true) {
      return true;
    } else {
      this._router.navigate(['**'])
      return false;
    }
  }
}
