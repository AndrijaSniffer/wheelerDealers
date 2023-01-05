import {Router} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject, Subscription} from "rxjs";
import {User} from "../../classes/user";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  private isAuthenticated: boolean;
  username: string = ''

  constructor(private router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe((isAuth) => {
      if (sessionStorage.getItem('access') != null &&
        sessionStorage.getItem('refresh') != null) {
        this._userService.currentUser = JSON.parse(atob(sessionStorage.getItem('access')!.split('.')[1])) as User;
        this.username = this._userService.currentUser.username;
        this.isAuthenticated = true;
      } else {
        this.username = isAuth ? this._userService.currentUser!.username : '';
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

  navigate() {
    this.router.navigate(['./management']);
  }

  navigateTo(path: string) {
    this.router.navigate([`main/${path}`]);
  }

  logout() {
    this._userService.logout();
    return true;
  }
}
