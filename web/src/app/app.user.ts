import {inject, Injectable} from '@angular/core';
import {User} from '@classes/user';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {mapToUser} from './app.mappers';

export interface JWTPair {
  refresh: string;
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUser {
  private readonly _router: Router = inject(Router);

  private _user: User | null;
  private _tokenExpiration: number;
  private _tokens: JWTPair | null;

  private _loggedIn: Subject<boolean>;
  loggedInObservable: Observable<boolean>;

  constructor() {
    this._loggedIn = new Subject<boolean>();
    this._loggedIn.next(false);

    this.loggedInObservable = this._loggedIn.asObservable();
  }

  get user(): User {
    return this._user;
  }

  /**
   *
   * @param user It can be either JSON (string) or a User object from the session storage
   */
  set user(user: string | User) {
    this._user = typeof user === 'string' ? mapToUser(user) : user instanceof User ? user : null;
  }

  get tokenExpiration(): number {
    return this._tokenExpiration;
  }

  set tokenExpiration(tokenExpiration: number) {
    this._tokenExpiration = tokenExpiration;
  }

  get tokens(): JWTPair {
    return this._tokens;
  }

  set tokens(pair: JWTPair) {
    this._tokens = pair;
  }

  setLoggedIn(loggedIn: boolean) {
    this._loggedIn.next(loggedIn);
  }

  logout(){
    this._user = null;
    this._tokenExpiration = null;
    this._tokens = null;
    this. _loggedIn.next(false);

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tokens');

    this._router.navigate(['/']).then(_ => {});
  }

}
