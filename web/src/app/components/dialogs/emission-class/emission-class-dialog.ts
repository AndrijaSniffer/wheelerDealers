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
import {EmissionClass} from '@classes/emission-class';
import {EmissionClassService} from '@services/emission-class.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'emission-class-dialog',
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
  templateUrl: 'emission-class-dialog.html',
  standalone: true,
  styleUrls: ['emission-class-dialog.css', '../dialogs.component.css']
})
export class EmissionClassDialog extends BaseDialog<EmissionClass> {
  private readonly _emissionClassService: EmissionClassService = inject(EmissionClassService);

  constructor(
    dialogRef: MatDialogRef<EmissionClassDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<EmissionClass> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);
    if (dialogData && dialogData.object) {
      this.isNewOrEdit = false;
      this.form = fb.group({
        className: [dialogData.object.className, Validators.required],
      });

    } else if (dialogData && !dialogData.object) {
      this.form = fb.group({
        className: ['', Validators.required],
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newEmissionClass: EmissionClass = {
          id: null,
          className: this.form.get('className').value,
        }

        this._emissionClassService.create(newEmissionClass).subscribe({
          next: (emissionClass) => {
            this.dismiss(emissionClass);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const emissionClass = this.dialogData.object;
          emissionClass.className = this.form.get('className').value;

          this._emissionClassService.update(emissionClass).subscribe({
            next: (emissionClass) => {
              this.dismiss(emissionClass);
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
