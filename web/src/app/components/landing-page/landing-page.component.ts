import {Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs";
import {User} from "../../classes/user";

interface IUser {
  username: string;
  isAdmin: boolean;
  isStaff: boolean;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  private isAuthenticated: boolean;
  iuser: IUser = {
    isAdmin: false,
    isStaff: false,
    username: ''
  };

  constructor(private router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe((isAuth) => {
      if (sessionStorage.getItem('access') != null) {
        this._userService.parseJwtToUser(null);

        if (this._userService.currentUser) {
          this.iuser.username = this._userService.currentUser.username;
          this.iuser.isAdmin = this._userService.currentUser.isAdmin ?? false;
          this.iuser.isStaff = this._userService.currentUser.isStaff ?? false;
        }

        this.isAuthenticated = true;
      } else {
        this.iuser.username = isAuth ? this._userService.currentUser!.username : '';
        this.iuser.isAdmin = isAuth ? (this._userService.currentUser!.isAdmin ?? false) : false;
        this.iuser.isStaff = isAuth ? (this._userService.currentUser!.isStaff ?? false) : false;
        this.isAuthenticated = isAuth;
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    console.log('unsubscribed');
  }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  get isStaff(): boolean {
    return this.iuser.isStaff;
  }

  navigateToLogin() {
    this.router.navigate(['./management']);
  }

  navigateToMain(path: string) {
    this.router.navigate([`main/${path}`]);
  }

  logout() {
    this._userService.logout();
    return true;
  }
}
