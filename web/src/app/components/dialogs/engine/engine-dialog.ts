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
import {Engine, EngineDTO} from '../../../classes/engine';
import {EngineService} from '../../../services/engine.service';
import {EngineTypeService} from '../../../services/engine-type.service';
import {EmissionClassService} from '../../../services/emission-class.service';
import {NotificationService} from '../../../services/notification.service';
import {EngineType} from '../../../classes/engine-type';
import {EmissionClass} from '../../../classes/emission-class';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'engine-dialog',
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
  templateUrl: 'engine-dialog.html',
  styleUrl: 'engine-dialog.css'
})
export class EngineDialog extends BaseDialog<Engine> {
  engineTypes: EngineType[] = [];
  emissionClasses: EmissionClass[] = [];
  private readonly _engineService: EngineService = inject(EngineService);
  private readonly _engineTypeService: EngineTypeService = inject(EngineTypeService);
  private readonly _emissionClassService: EmissionClassService = inject(EmissionClassService);

  constructor(
    dialogRef: MatDialogRef<EngineDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Engine> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    this.form = fb.group({
      engineType: [null, Validators.required],
      emissionClass: [null, Validators.required],
      engineCode: ['', Validators.required],
      horsepower: [null],
      kilowatt: [null],
      volume: [600, Validators.required]
    });

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable(); // Optionally disable the form in view mode
    } else {
      // Edit or New mode: Fetch countries and initialize form accordingly
      this._engineTypeService.getAll().subscribe({
        next: (data) => {
          this.engineTypes = data;
          this._emissionClassService.getAll().subscribe({
            next: (data) => {
              this.emissionClasses = data;

              if (dialogData?.object) {
                // Editing an existing engine
                this.isNewOrEdit = false;
                this.form.patchValue({
                  engineType: dialogData.object.engineType.id,
                  emissionClass: dialogData.object.emissionClass.id,
                  engineCode: dialogData.object.engineCode,
                  horsepower: dialogData.object.horsepower,
                  kilowatt: dialogData.object.kilowatt,
                  volume: dialogData.object.volume
                });
              } else {
                // Creating a new manufacturer
                this.isNewOrEdit = true;
                // Form is already initialized with defaults
              }
            },
            error: (error) => {
              console.error('Error fetching emission classes:', error);
              notification.showTimedErrorNotification('Failed to load emission classes');
            }
          });
        },
        error: (error) => {
          console.error('Error fetching engine types:', error);
          notification.showTimedErrorNotification('Failed to load engine types');
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        // Create new manufacturer
        const newEngine: EngineDTO = {
          id: null,
          engineType: this.form.get('engineType')!.value,
          emissionClass: this.form.get('emissionClass')!.value,
          engineCode: this.form.get('engineCode')!.value,
          horsepower: this.form.get('horsepower')!.value !== 0 ? this.form.get('horsepower')!.value : null,
          kilowatt: this.form.get('kilowatt')!.value !== 0 ? this.form.get('kilowatt')!.value : null,
          volume: this.form.get('volume')!.value,
        };

        this._engineService.create(newEngine).subscribe({
          next: (engine) => {
            this.dismiss(engine);
          },
          error: (error) => {
            console.error('Error creating engine:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        // Update existing manufacturer
        if (this.dialogData?.object?.id) {
          const engine: EngineDTO = {
            id: this.dialogData.object.id,
            engineType: this.form.get('engineType')!.value,
            emissionClass: this.form.get('emissionClass')!.value,
            engineCode: this.form.get('engineCode')!.value,
            horsepower: this.form.get('horsepower')!.value !== 0 ? this.form.get('horsepower')!.value : null,
            kilowatt: this.form.get('kilowatt')!.value !== 0 ? this.form.get('kilowatt')!.value : null,
            volume: this.form.get('volume')!.value,
          };

          this._engineService.update(engine).subscribe({
            next: (manufacturer) => {
              this.dismiss(manufacturer);
            },
            error: (error) => {
              console.error('Error updating engine:', error);
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
