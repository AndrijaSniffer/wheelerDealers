import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../classes/user";

interface IUser {
  username: string;
  isAdmin: boolean;
  isStaff: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private destroyed$ = new Subject<void>();
  private isAuthenticated: boolean;
  iuser: IUser = {
    isAdmin: false,
    isStaff: false,
    username: ''
  };

  constructor(private _router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    // this._userService.isAuthenticated.subscribe((isAuth) => {
    if (sessionStorage.getItem('access') != null &&
      sessionStorage.getItem('refresh') != null) {

      this._userService.currentUser = JSON.parse(atob(sessionStorage.getItem('access')!.split('.')[1])) as User;
      this.iuser.username = this._userService.currentUser.username;
      this.iuser.isAdmin = this._userService.currentUser.isAdmin ?? false;
      this.iuser.isStaff = this._userService.currentUser.isStaff ?? false;

      this.isAuthenticated = true;
    }
    // else {
    //   this.iuser.username = this._userService.currentUser!.username;
    //   this.iuser.isAdmin = this._userService.currentUser!.isAdmin ?? false;
    //   this.iuser.isStaff = this._userService.currentUser!.isStaff ?? false;
    //   this.isAuthenticated = true;
    //     this.isAuthenticated = isAuth;
    //   }
    // })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    console.log('unsubscribed');
  }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  navigateToAdmin(path: string) {
    this._router.navigate([`admin/${path}`]);
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['']);
  }
}
