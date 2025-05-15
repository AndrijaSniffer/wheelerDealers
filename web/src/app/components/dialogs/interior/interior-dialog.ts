import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {Interior} from '../../../classes/interior';
import {InteriorService} from '../../../services/interior.service';
import {NotificationService} from '../../../services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'interior-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    MatList,
    MatListItem,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatCheckbox
  ],
  templateUrl: 'interior-dialog.html',
  styleUrls: ['interior-dialog.css', '../dialogs.component.css']
})
export class InteriorDialog extends BaseDialog<Interior> {
  private readonly _interiorService: InteriorService = inject(InteriorService);

  constructor(
    dialogRef: MatDialogRef<InteriorDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Interior> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    if (dialogData && dialogData.object) {
      this.isNewOrEdit = false;
      this.form = fb.group({
        doors: [dialogData.object.doors, Validators.required],
        seats: [dialogData.object.seats, Validators.required],
        steeringWheelLeft: dialogData.object.steeringWheelLeft,
        color: dialogData.object.color,
      });

    } else if (dialogData && !dialogData.object) {
      this.form = fb.group({
        doors: [0, Validators.required],
        seats: [0, Validators.required],
        steeringWheelLeft: true,
        color: '',
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newInterior: Interior = {
          id: null,
          doors: this.form.get('doors').value,
          seats: this.form.get('seats').value,
          steeringWheelLeft: this.form.get('steeringWheelLeft').value,
          color: this.form.get('color').value ? this.form.get('color').value : null
        }

        this._interiorService.create(newInterior).subscribe({
          next: (interior) => {
            this.dismiss(interior);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const interior = this.dialogData.object;
          interior.doors = this.form.get('doors').value;
          interior.seats = this.form.get('seats').value;
          interior.steeringWheelLeft = this.form.get('steeringWheelLeft').value;
          interior.color = this.form.get('color').value ? this.form.get('color').value : null;

          this._interiorService.update(interior).subscribe({
            next: (interior) => {
              this.dismiss(interior);
            },
            error: (error) => {
              this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
            }
          });
        }
      }
    }
  }
}
