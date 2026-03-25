import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from '@nav-bar/nav-bar.component';
import {FooterComponent} from '@footer/footer.component';
import {AppUser, JWTPair} from './app.user';
import {AppUtil} from './app.util';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly _appUser: AppUser = inject(AppUser);


  title = 'Wheeler Dealers';

  ngOnInit() {
    this.checkIfAuthenticated();
  }

  private checkIfAuthenticated() {
    const storedTokens = sessionStorage.getItem('tokens');
    const storedUser = sessionStorage.getItem('user');

    if (storedTokens && storedUser) {
      const tokens: JWTPair = JSON.parse(storedTokens);
      this._appUser.user = storedUser;
      this._appUser.tokens = tokens;
      this._appUser.tokenExpiration = AppUtil.decodeJWTAccessToken(tokens.access).exp;
      this._appUser.setLoggedIn(true);
    }
  }
}
