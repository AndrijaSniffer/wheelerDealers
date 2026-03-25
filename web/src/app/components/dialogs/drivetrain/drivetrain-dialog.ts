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
import {Drivetrain} from '@classes/drivetrain';
import {DrivetrainService} from '@services/drivetrain.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'drivetrain-dialog',
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
    MatError
  ],
  templateUrl: 'drivetrain-dialog.html',
  standalone: true,
  styleUrls: ['drivetrain-dialog.css', '../dialogs.component.css']
})
export class DrivetrainDialog extends BaseDialog<Drivetrain> {
  private readonly _drivetrainService: DrivetrainService = inject(DrivetrainService);

  constructor(
    dialogRef: MatDialogRef<DrivetrainDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Drivetrain> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    if (dialogData && dialogData.object) {
      this.isNewOrEdit = false;
      this.form = fb.group({
        type: [dialogData.object.type, Validators.required]
      });

    } else if (dialogData && !dialogData.object) {
      this.form = fb.group({
        type: ['', Validators.required]
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newDrivetrain: Drivetrain = {
          id: null,
          type: this.form.get('type').value
        }

        this._drivetrainService.create(newDrivetrain).subscribe({
          next: (drivetrain) => {
            this.dismiss(drivetrain);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const drivetrain = this.dialogData.object;
          drivetrain.type = this.form.get('type').value;

          this._drivetrainService.update(drivetrain).subscribe({
            next: (drivetrain) => {
              this.dismiss(drivetrain);
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
