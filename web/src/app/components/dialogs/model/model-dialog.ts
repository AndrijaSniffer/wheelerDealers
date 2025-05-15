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
import {Model, ModelDTO} from '../../../classes/model';
import {ModelService} from '../../../services/model.service';
import {EngineService} from '../../../services/engine.service';
import {ManufacturerService} from '../../../services/manufacturer.service';
import {NotificationService} from '../../../services/notification.service';
import {Engine} from '../../../classes/engine';
import {Manufacturer} from '../../../classes/manufacturer';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

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
  styleUrls: ['model-dialog.css', '../dialogs.component.css']
})
export class ModelDialog extends BaseDialog<Model> {
  engines: Engine[] = [];
  manufacturers: Manufacturer[] = [];
  currentYear = new Date().getFullYear();
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _engineService: EngineService = inject(EngineService);
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
      yearOfManufacture: [1930, Validators.required],
      manufacture: [null, Validators.required],
      engine: [null, Validators.required]
    });

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable(); // Optionally disable the form in view mode
    } else {
      // Edit or New mode: Fetch countries and initialize form accordingly
      this._engineService.getAll().subscribe({
        next: (data) => {
          this.engines = data;
          this._manufacturerService.getAll().subscribe({
            next: (data) => {
              this.manufacturers = data;

              if (dialogData?.object) {
                // Editing an existing engine
                this.isNewOrEdit = false;
                this.form.patchValue({
                  name: dialogData.object.name,
                  yearOfManufacture: dialogData.object.yearOfManufacture,
                  manufacture: dialogData.object.manufacturer.id,
                  engine: dialogData.object.engine.id
                });
              } else {
                // Creating a new manufacturer
                this.isNewOrEdit = true;
                // Form is already initialized with defaults
              }
            },
            error: (error) => {
              console.error('Error fetching manufacturers:', error);
              notification.showTimedErrorNotification('Failed to load manufacturers');
            }
          });
        },
        error: (error) => {
          console.error('Error fetching engine:', error);
          notification.showTimedErrorNotification('Failed to load engine');
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        // Create new manufacturer
        const newModel: ModelDTO = {
          id: null,
          name: this.form.get('name').value,
          yearOfManufacture: this.form.get('yearOfManufacture').value,
          engine: this.form.get('engine').value,
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
        // Update existing manufacturer
        if (this.dialogData?.object?.id) {
          const model: ModelDTO = {
            id: this.dialogData.object.id,
            name: this.form.get('name').value,
            yearOfManufacture: this.form.get('yearOfManufacture').value,
            engine: this.form.get('engine').value,
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
