import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialog, SignUpDialog} from '../dialogs/dialogs.component';
import {NotificationService} from '../../services/notification.service';
import {AppUser} from '../../app.user';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbar,
    MatButton,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);
  private readonly _notification = inject(NotificationService)
  private readonly _appUser = inject(AppUser);

  isLoggedIn: boolean = false;
  username: String = '';

  goToHome(){
    this._router.navigate(['/']).then(() => {});
  }

  goToSearch(){
    this._router.navigate(['/search']).then(() => {});
  }

  goToContact(){
    this._router.navigate(['/contact']).then(() => {});
  }

  openLoginDialog() {
    const dialogRef = this._dialog.open(LoginDialog)

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._router.navigate(['/']).then(() => {
          this.isLoggedIn = true;
          this.username = this._appUser.user.username;
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
      if(result){
        this._router.navigate(['/']).then(() => {
          this._notification.showTimedNotification("Registered successfully!<br>You may log in now");
          this.openLoginDialog();
        });
      }
    });
  }

  logout(){
    this._appUser.tokens = null;
    this._appUser.user = null;
    this._appUser.tokenExpiration = null;

    this._appUser.setLoggedIn(false);
    this.isLoggedIn = false;

    this._router.navigate(['/']).then(() => {
      this._notification.showTimedNotification("Logged out successfully!");
    });
  }
}
