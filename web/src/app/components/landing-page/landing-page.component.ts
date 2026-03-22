import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {AppUser} from '../../app.user';

@Component({
  selector: 'app-landing-page',
  imports: [
    MatButton,
    MatIcon,
    MatDivider
  ],
  templateUrl: './landing-page.component.html',
  standalone: true,
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private readonly _router: Router = inject(Router);
  protected readonly _appUser: AppUser = inject(AppUser);

  goToSearch() {
    this._router.navigate(['/search']).then(() => {});
  }

  goToContact() {
    this._router.navigate(['/contact']).then(() => {});
  }
}
