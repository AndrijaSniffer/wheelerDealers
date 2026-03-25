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
import {ModelType} from '@classes/model-type';
import {ModelTypeService} from '@services/model-type.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'model-type-dialog',
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
  templateUrl: 'model-type-dialog.html',
  standalone: true,
  styleUrls: ['model-type-dialog.css', '../dialogs.component.css']
})
export class ModelTypeDialog extends BaseDialog<ModelType> {
  private readonly _modelTypeService: ModelTypeService = inject(ModelTypeService);

  constructor(
    dialogRef: MatDialogRef<ModelTypeDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<ModelType> | null,
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
        const newModelType: ModelType = {
          id: null,
          type: this.form.get('type').value,
        }

        this._modelTypeService.create(newModelType).subscribe({
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
          const modelType = this.dialogData.object;
          modelType.type = this.form.get('type').value;

          this._modelTypeService.update(modelType).subscribe({
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
