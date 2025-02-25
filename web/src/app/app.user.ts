import {Injectable} from '@angular/core';
import {User} from './classes/user';
import {from, Observable} from 'rxjs';
import {UserFactory} from './factories/user.factory';

interface JWTPair {
  refresh: string;
  access: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppUser {
  private _user: User | null;
  private _tokenExpiration: number;
  private _tokens: JWTPair | null;

  private _loggedIn: Promise<boolean>;
  loggedInObservable: Observable<boolean>;

  constructor() {
    this._loggedIn = Promise.resolve(false);
    this.loggedInObservable = from(this._loggedIn);
  }

  get user(): User {
    return this._user;
  }

  set user(jsonData: any) {
    if (jsonData) {
      this._user = UserFactory.create(jsonData);
    } else {
      this._user = null;
    }
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
    this._loggedIn = Promise.resolve(loggedIn);
  }

}
