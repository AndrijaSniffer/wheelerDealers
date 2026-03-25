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
import {Country} from '@classes/country';
import {CountryService} from '@services/country.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../../app.util';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';

@Component({
  selector: 'country-dialog',
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
  templateUrl: 'country.dialog.html',
  styleUrls: ['country.dialog.css', '../dialogs.component.css'],
  standalone: true
})
export class CountryDialog extends BaseDialog<Country> {
  private readonly _countryService: CountryService = inject(CountryService);

  constructor(
    dialogRef: MatDialogRef<CountryDialog>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Country> | null,
    notification: NotificationService
  ) {
    super(dialogRef, fb, dialogData, notification);

    if (dialogData && dialogData.object) {
      this.isNewOrEdit = false;
      this.form = fb.group({
        name: [dialogData.object.name, Validators.required],
      });

    } else if (dialogData && !dialogData.object) {
      this.form = fb.group({
        name: ['', Validators.required],
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.isNewOrEdit) {
        const newCountry: Country = {
          id: null,
          name: this.form.get('name').value,
        }

        this._countryService.create(newCountry).subscribe({
          next: (country) => {
            this.dismiss(country);
          },
          error: (error) => {
            console.error(error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        if (this.dialogData.object.id) {
          const country = this.dialogData.object;
          country.name = this.form.get('name').value;

          this._countryService.update(country).subscribe({
            next: (country) => {
              this.dismiss(country);
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
