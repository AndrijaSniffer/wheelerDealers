import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  showTimedNotification(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showTimedErrorNotification(message: string): void {
    this.snackBar.open(message, null, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-notification'
    });
  }
}
