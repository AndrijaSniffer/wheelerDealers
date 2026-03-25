import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {AuthService} from '@services/auth.service';
import {NotificationService} from '@services/notification.service';

@Component({
  selector: 'login-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatFormFieldModule,
    MatDialogActions,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: 'login.dialog.html',
  standalone: true,
  styleUrl: 'login.dialog.css'
})
export class LoginDialog {
  form: FormGroup;
  private readonly _dialogRef = inject(MatDialogRef<LoginDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthService);
  private readonly _notification = inject(NotificationService)

  constructor() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  dismiss() {
    this._dialogRef.close();
  }

  async submit() {
    if (this.form.valid) {
      let isLoggedIn = await this._auth.login(this.form.get('username').value, this.form.get('password').value);

      if (isLoggedIn) {
        this._dialogRef.close(true);
      } else {
        this._notification.showTimedErrorNotification('Login failed. Please check your credentials and try again.');
      }
    }
  }
}
