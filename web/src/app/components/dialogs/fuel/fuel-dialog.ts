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
import {Fuel} from '../../../classes/fuel';
import {FuelService} from '../../../services/fuel.service';
import {NotificationService} from '../../../services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'fuel-dialog',
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
  templateUrl: 'fuel-dialog.html',
  styleUrls: ['fuel-dialog.css', '../dialogs.component.css']
})
export class FuelDialog extends BaseDialog<Fuel> {
  private readonly _fuelService: FuelService = inject(FuelService);

  constructor(
    dialogRef: MatDialogRef<FuelDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Fuel> | null,
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
        const newFuel: Fuel = {
          id: null,
          type: this.form.get('type').value
        }

        this._fuelService.create(newFuel).subscribe({
          next: (fuel) => {
            this.dismiss(fuel);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const fuel = this.dialogData.object;
          fuel.type = this.form.get('type').value;

          this._fuelService.update(fuel).subscribe({
            next: (fuel) => {
              this.dismiss(fuel);
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
