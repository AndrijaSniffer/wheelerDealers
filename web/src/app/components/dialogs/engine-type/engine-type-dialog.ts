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
import {EngineType} from '../../../classes/engine-type';
import {EngineTypeService} from '../../../services/engine-type.service';
import {NotificationService} from '../../../services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'engine-type-dialog',
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
  templateUrl: 'engine-type-dialog.html',
  styleUrls: ['engine-type-dialog.css', '../dialogs.component.css'],
})
export class EngineTypeDialog extends BaseDialog<EngineType> {
  private readonly _engineTypeService: EngineTypeService = inject(EngineTypeService);

  constructor(
    dialogRef: MatDialogRef<EngineTypeDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<EngineType> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    if (dialogData && dialogData.object) {
      this.isNewOrEdit = false;
      this.form = fb.group({
        type: [dialogData.object.type, Validators.required],
      });

    } else if (dialogData && !dialogData.object) {
      this.form = fb.group({
        type: ['', Validators.required],
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newEngineType: EngineType = {
          id: null,
          type: this.form.get('type').value,
        }

        this._engineTypeService.create(newEngineType).subscribe({
          next: (engineType) => {
            console.log(engineType);
            this.dismiss(engineType);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const engineType = this.dialogData.object;
          engineType.type = this.form.get('type').value;

          this._engineTypeService.update(engineType).subscribe({
            next: (engineType) => {
              this.dismiss(engineType);
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
