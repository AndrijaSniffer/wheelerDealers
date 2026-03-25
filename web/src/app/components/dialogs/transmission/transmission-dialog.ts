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
import {TransmissionType} from '@classes/transmissionType';
import {TransmissionTypeService} from '@services/transmission-type.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'transmission-dialog',
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
  templateUrl: 'transmission-dialog.html',
  standalone: true,
  styleUrls: ['transmission-dialog.css', '../dialogs.component.css']
})
export class TransmissionDialog extends BaseDialog<TransmissionType> {
  private readonly _transmissionService: TransmissionTypeService = inject(TransmissionTypeService);

  constructor(
    dialogRef: MatDialogRef<TransmissionDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<TransmissionType> | null,
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
        type: ['', Validators.required],
        gears: [0]
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newTransmission: TransmissionType = {
          id: null,
          type: this.form.get('type').value
        }

        this._transmissionService.create(newTransmission).subscribe({
          next: (transmission) => {
            this.dismiss(transmission);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const transmission = this.dialogData.object;
          transmission.type = this.form.get('type').value;

          this._transmissionService.update(transmission).subscribe({
            next: (transmission) => {
              this.dismiss(transmission);
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
