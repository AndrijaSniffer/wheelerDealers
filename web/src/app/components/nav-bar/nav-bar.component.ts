import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';
import {AppUser} from '../../app.user';
import {NgIf} from '@angular/common';
import {LoginDialog} from '../dialogs/login/login-dialog';
import {SignUpDialog} from '../dialogs/sign-up/sign-up-dialog';
import {CarDialog} from '../dialogs/car/car-dialog';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbar,
    MatButton,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);
  private readonly _notification = inject(NotificationService)
  private readonly _appUser = inject(AppUser);

  isLoggedIn: boolean = false;
  username: String = '';
  isSuperuser: boolean = false;
  isDealership: boolean = false;

  constructor() {
    this._appUser.loggedInObservable.subscribe(loggedIn => {
      console.warn(this._appUser.user)
      if (loggedIn) {
        this.isLoggedIn = loggedIn;
        this.username = this._appUser.user.username;
        this.isSuperuser = this._appUser.user.isSuperuser;
        this.isDealership = this._appUser.user.PIB !== null;
      } else {
        this.isLoggedIn = false;
        this.username = '';
        this.isSuperuser = false;
        this.isDealership = false;
      }
    });
  }

  goToHome() {
    this._router.navigate(['/']).then(() => {
    });
  }

  goToSearch() {
    this._router.navigate(['/search']).then(() => {
    });
  }

  goToContact() {
    this._router.navigate(['/contact']).then(() => {
    });
  }

  dealershipNavigate(route: string) {
    this._router.navigate([`dealership/${route}`]).then(() => {
    });
  }

  goToProfile() {
    this._router.navigate(['/profile']).then(() => {
    });
  }

  openLoginDialog() {
    const dialogRef = this._dialog.open(LoginDialog)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let pathUrl = '/';
        if (this._appUser.user.isSuperuser) {
          pathUrl = 'admin/countryManagement';
        } else if (this._appUser.user.PIB !== null) {
          pathUrl = 'dealership/dashboard';
        }
        this._router.navigate([pathUrl]).then(() => {
          this._notification.showTimedNotification("Logged in successfully!");
        });
      }
    });

  }

  openSignUpDialog() {
    const dialogRef = this._dialog.open(SignUpDialog, {
      minWidth: '30vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._router.navigate(['/']).then(() => {
          this._notification.showTimedNotification(`Registered successfully!\nYou may log in now`);
          this.openLoginDialog();
        });
      }
    });
  }

  logout() {
    this._appUser.logout();
  }

  adminNavigate(route: string) {
    this._router.navigate([`admin/${route}`]).then(() => {
    });
  }

  temporaryCarAdd() {
    this._dialog.open(CarDialog, {
      minWidth: '20vw',
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Car successfully posted!');
      }
    })
  }
}
