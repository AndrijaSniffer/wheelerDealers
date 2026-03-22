import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppUser} from '../../app.user';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/divider';
import {DatePipe, NgIf} from '@angular/common';
import {AppUtil} from '../../app.util';
import {User} from '../../classes/user';
import {mapToUser} from '../../app.mappers';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatCheckbox,
    MatDivider,
    NgIf,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly _appUser: AppUser = inject(AppUser);
  private readonly _userService: UserService = inject(UserService);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  user: User;
  isDealership: boolean = false;

  profileForm: FormGroup = this._fb.group({
    email: [''],
    phone: [''],
    address: [''],
    isReseller: [false]
  });

  ngOnInit() {
    this.user = this._appUser.user;
    this.isDealership = this.user.PIB !== null;

    this.profileForm.patchValue({
      email: this.user.email,
      phone: this.user.phone || '',
      address: this.user.address || '',
      isReseller: this.user.isReseller
    });
  }

  onSave() {
    const formData = this.profileForm.value;

    const updateData: any = {
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      is_reseller: formData.isReseller
    };

    this._userService.updateUser(this.user.id, updateData).subscribe({
      next: (response) => {
        const updatedUser = mapToUser(response);
        this._appUser.user = updatedUser;
        this.user = updatedUser;

        sessionStorage.setItem('user', JSON.stringify(response));

        this._notification.showTimedNotification('Profile updated successfully!');
      },
      error: (err) => {
        console.error(err);
        if (err.error?.error) {
          this._notification.showTimedErrorNotification(err.error.error);
        } else {
          this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
        }
      }
    });
  }
}
