import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {Model, ModelDTO} from '@classes/model';
import {ModelService} from '@services/model.service';
import {ManufacturerService} from '@services/manufacturer.service';
import {NotificationService} from '@services/notification.service';
import {Manufacturer} from '@classes/manufacturer';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'model-dialog',
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
    MatSelect,
    FormsModule,
    MatOption
  ],
  templateUrl: 'model-dialog.html',
  standalone: true,
  styleUrls: ['model-dialog.css', '../dialogs.component.css']
})
export class ModelDialog extends BaseDialog<Model> {
  manufacturers: Manufacturer[] = [];
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);

  constructor(
    dialogRef: MatDialogRef<ModelDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Model> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    this.form = this.fb.group({
      name: ['', Validators.required],
      manufacture: [null, Validators.required]
    });

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable(); // Optionally disable the form in view mode
    } else {
      // Edit or New mode: Fetch manufacturers and initialize form accordingly
      this._manufacturerService.getAll().subscribe({
        next: (data) => {
          this.manufacturers = data;

          if (dialogData?.object) {
            // Editing an existing model
            this.isNewOrEdit = false;
            this.form.patchValue({
              name: dialogData.object.name,
              manufacture: dialogData.object.manufacturer.id
            });
          } else {
            // Creating a new model
            this.isNewOrEdit = true;
            // Form is already initialized with defaults
          }
        },
        error: (error) => {
          console.error('Error fetching manufacturers:', error);
          notification.showTimedErrorNotification('Failed to load manufacturers');
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        // Create new model
        const newModel: ModelDTO = {
          id: null,
          name: this.form.get('name').value,
          manufacturer: this.form.get('manufacture').value
        };

        this._modelService.create(newModel).subscribe({
          next: (model) => {
            this.dismiss(model);
          },
          error: (error) => {
            console.error('Error creating model:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        // Update existing model
        if (this.dialogData?.object?.id) {
          const model: ModelDTO = {
            id: this.dialogData.object.id,
            name: this.form.get('name').value,
            manufacturer: this.form.get('manufacture').value
          };

          this._modelService.update(model).subscribe({
            next: (model) => {
              this.dismiss(model);
            },
            error: (error) => {
              console.error('Error updating model:', error);
              this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
            }
          });
        }
      }
    } else {
      this.notification.showTimedErrorNotification('Please fill out all required fields');
    }
  }
}
