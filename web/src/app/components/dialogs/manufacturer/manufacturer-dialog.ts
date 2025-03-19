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
import {Manufacturer, ManufacturerDTO} from '../../../classes/manufacturer';
import {ManufacturerService} from '../../../services/manufacturer.service';
import {CountryService} from '../../../services/country.service';
import {NotificationService} from '../../../services/notification.service';
import {Country} from '../../../classes/country';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';

@Component({
  selector: 'manufacturer-dialog',
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
  templateUrl: 'manufacturer-dialog.html',
  styleUrl: 'manufacturer-dialog.css'
})
export class ManufacturerDialog extends BaseDialog<Manufacturer> {
  countries: Country[] = [];
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);
  private readonly _countryService: CountryService = inject(CountryService);

  constructor(
    dialogRef: MatDialogRef<ManufacturerDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Manufacturer> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    this.form = this.fb.group({
      name: ['', Validators.required],
      country: [null, Validators.required]
    });

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable(); // Optionally disable the form in view mode
    } else {
      // Edit or New mode: Fetch countries and initialize form accordingly
      this._countryService.getAll().subscribe({
        next: (data) => {
          this.countries = data;
          if (dialogData?.object) {
            // Editing an existing manufacturer
            this.isNewOrEdit = false;
            this.form.patchValue({
              name: dialogData.object.name,
              country: dialogData.object.country.id
            });
          } else {
            // Creating a new manufacturer
            this.isNewOrEdit = true;
            // Form is already initialized with defaults
          }
        },
        error: (error) => {
          console.error('Error fetching countries:', error);
          notification.showTimedErrorNotification('Failed to load countries');
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        // Create new manufacturer
        const newManufacturer: ManufacturerDTO = {
          id: null,
          name: this.form.get('name')!.value,
          country: this.form.get('country')!.value
        };

        this._manufacturerService.create(newManufacturer).subscribe({
          next: (manufacturer) => {
            this.dismiss(manufacturer);
          },
          error: (error) => {
            console.error('Error creating manufacturer:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        // Update existing manufacturer
        if (this.dialogData?.object?.id) {
          const manufacturer: ManufacturerDTO = {
            id: this.dialogData.object.id,
            name: this.form.get('name')!.value,
            country: this.form.get('country')!.value
          };

          this._manufacturerService.update(manufacturer).subscribe({
            next: (manufacturer) => {
              this.dismiss(manufacturer);
            },
            error: (error) => {
              console.error('Error updating manufacturer:', error);
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
