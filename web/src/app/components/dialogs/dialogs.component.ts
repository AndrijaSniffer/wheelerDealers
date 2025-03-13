import {Component, inject, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {AuthService} from '../../services/auth.service';
import {MatStep, MatStepLabel, MatStepper} from '@angular/material/stepper';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {NgForOf, NgIf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {User} from '../../classes/user';
import {MatDivider} from '@angular/material/divider';
import {CountryService} from '../../services/country.service';
import {Country} from '../../classes/country';
import {AppUtil} from '../../app.util';
import {NotificationService} from '../../services/notification.service';
import {EngineType} from '../../classes/engine-type';
import {EngineTypeService} from '../../services/engine-type.service';
import {EmissionClass} from '../../classes/emission-class';
import {EmissionClassService} from '../../services/emission-class.service';

export interface IDialogData<T> {
  object: T,
  isView: boolean
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: 'yes-no.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  styles: ''
})
export class YesNoDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<YesNoDialogComponent>);
  private readonly _data = inject<string>(MAT_DIALOG_DATA);

  textToDisplay = '';

  constructor() {
    this.textToDisplay = this._data;
  }

  dismiss(value: boolean) {
    this._dialogRef.close(value);
  }
}

@Component({
  selector: 'login-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatFormFieldModule,
    MatDialogActions,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.css'
})
export class LoginDialog {
  private readonly _dialogRef = inject(MatDialogRef<LoginDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthService);

  form: FormGroup;

  constructor() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  dismiss() {
    this._dialogRef.close();
  }

  async submit() {
    if (this.form.valid) {
      let isLoggedIn = await this._auth.login(this.form.get('username').value, this.form.get('password').value);

      if (isLoggedIn) {
        this._dialogRef.close(true);
      }
    }
  }
}

@Component({
  selector: 'sign-up-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatRadioGroup,
    MatRadioButton,
    NgIf,
    MatStepLabel,
    MatListItem,
    MatList,
    MatButton,
    MatDivider,
    NgForOf
  ],
  templateUrl: './sign-up.dialog.html',
  styleUrls: ['./sign-up.dialog.css']
})
export class SignUpDialog {
  private readonly _dialogRef = inject(MatDialogRef<SignUpDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthService);

  @ViewChild('stepper') stepper: MatStepper;

  selectedFile: File | null = null;
  isValidFile: boolean | null = null;
  userFields: { label: string; value: any }[] = [];
  companyFields: { label: string; value: any }[] = [];

  formUser: FormGroup = this._fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    phone: [''],
    address: [''],
    isCompanyRequired: ['']
  }, {
    validators: this.passwordsMatchValidator
  });

  formCompany: FormGroup = this._fb.group({
    PIB: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    logo: [''],
    websiteUrl: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([/?#].*)?$/)]]
  });

  userFieldLabels = {
    username: 'Username:',
    email: 'Email address:',
    password: 'Password:',
    phone: 'Phone number:',
    address: 'Address:',
    isCompanyRequired: 'Company required:'
  };

  companyFieldLabels = {
    pib: 'PIB:',
    address: 'Address:',
    phone: 'Phone number:',
    logo: 'Logo:',
    websiteUrl: 'Website URL:'
  };

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      form.get('confirmPassword')?.setErrors(null);
      return null; // Passwords match
    } else {
      // Set the error on the confirmPassword field
      form.get('confirmPassword')?.setErrors({passwordsMismatch: true});
      return {passwordsMismatch: true};
    }
  }

  hasPasswordMismatchError(): boolean {
    return this.formUser.get('confirmPassword')?.hasError('passwordsMismatch') && this.formUser.get('confirmPassword')?.touched;
  }

  onIsCompanyRequiredChange(value: string,) {
    if (value === 'yes') {
      this.stepper.next();
    } else {
      this.onLastStep();
    }
  }

  onLastStep() {
    this.populateReviewFields();
    this.stepper.selectedIndex = 2;
  }

  // Method to populate the fields for the review screen
  populateReviewFields() {
    const excludedFields = ['confirmPassword']; // Fields to exclude from the review screen

    // Populate userFields, excluding confirmPassword
    this.userFields = Object.entries(this.formUser.value)
      .filter(([key]) => !excludedFields.includes(key)) // Filter out excluded fields
      .map(([key, value]) => ({
        label: this.userFieldLabels[key] || key, // Use label or fallback to key
        value: key === 'password' ? '********' : this.formatValue(value) // Mask password
      }));

    // Populate companyFields (no exclusions needed here)
    this.companyFields = Object.entries(this.formCompany.value)
      .map(([key, value]) => ({
        label: this.companyFieldLabels[key] || key,
        value: this.formatValue(value)
      }));
  }

  // Helper method to format values (e.g., booleans to Yes/No)
  private formatValue(value: any): string {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value || 'No information was provided'; // Handle null/undefined as empty string
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Check if the file extension is valid
      if (allowedExtensions.includes(fileExtension)) {
        this.isValidFile = true; // Mark as valid
        this.selectedFile = file;
        this.formCompany.patchValue({logo: file.name});
      } else {
        console.warn(!this.isValidFile && this.selectedFile);
        this.isValidFile = false; // Mark as invalid
        this.selectedFile = null; // Reset selected file
        this.formCompany.patchValue({logo: ''}); // Clear the form control
        console.warn(!this.isValidFile && this.selectedFile);
      }
    }
  }

  async onConfirm() {
    if (this.formUser.valid) {
      if (this.formCompany.valid) {
        const websiteUrl = this.formCompany.get('websiteUrl').value == '' ? null : this.formCompany.get('websiteUrl').value;
        const company = {
          PIB: this.formCompany.get('PIB').value,
          address: this.formCompany.get('address').value,
          phone: this.formCompany.get('phone').value,
          logoUrl: null,
          websiteUrl: websiteUrl
        }
        this._auth.registerCompany(company, this.selectedFile).then(async logo_url => {
          if (logo_url) {
            company.logoUrl = logo_url.toString();
          }

          const user: User = {
            username: this.formUser.get('username').value,
            address: this.formUser.get('address').value === '' ? null : this.formUser.get('address').value,
            email: this.formUser.get('email').value,
            PIB: company,
            phone: this.formUser.get('phone').value === '' ? null : this.formUser.get('phone').value,
            password: this.formUser.get('confirmPassword').value,
            dateJoined: new Date(),
            isActive: true,
            isReseller: this.formUser.get('isCompanyRequired').value === 'yes',
            isStaff: false,
            lastLogin: null,
            isSuperuser: false,
            id: null
          }

          if (await this._auth.registerUser(user)) {
            this._dialogRef.close(true);
          } else {

            this.onReset();
          }
        });
      } else {
        const user: User = {
          username: this.formUser.get('username').value,
          address: this.formUser.get('address').value === '' ? null : this.formUser.get('address').value,
          email: this.formUser.get('email').value,
          PIB: null,
          phone: this.formUser.get('phone').value == '' ? null : this.formUser.get('phone').value,
          password: this.formUser.get('confirmPassword').value,
          dateJoined: new Date(),
          isActive: true,
          isReseller: this.formUser.get('isCompanyRequired').value === 'yes',
          isStaff: false,
          lastLogin: null,
          isSuperuser: false,
          id: null
        }

        if (await this._auth.registerUser(user)) {
          this._dialogRef.close(true);
        } else {
          this.onReset();
        }
      }
    }
  }

  onReset() {
    this.formUser.reset();
    this.formCompany.reset();
    this.selectedFile = null;
    this.isValidFile = null;

    this.stepper.reset();
  }
}

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
  styleUrls: ['country.dialog.css'],
})
export class CountryDialog {
  private readonly _dialogRef = inject(MatDialogRef<CountryDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _data = inject<IDialogData<Country> | null>(MAT_DIALOG_DATA);
  private readonly _countryService: CountryService = inject(CountryService);
  private readonly _notification = inject(NotificationService);

  isView: boolean = true;
  isNewOrEdit: boolean = true;
  jsonCountryObject: string = '';
  form: FormGroup;

  constructor() {
    this.isView = this._data.isView;

    if (this._data.isView) {
      this.jsonCountryObject = AppUtil.toRawJSONText(this._data.object);

    } else if (this._data && this._data.object) {
      this.isNewOrEdit = false;
      this.form = this._fb.group({
        name: [this._data.object.name, Validators.required],
      });

    } else if (this._data && !this._data.object) {
      this.form = this._fb.group({
        name: ['', Validators.required],
      });
    }
  }

  dismiss(value: any) {
    this._dialogRef.close(value);
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
            console.log(country);
            this.dismiss(country);
          },
          error: (error) => {
            console.error(error);
            this._notification.showTimedErrorNotification(error.message);
          }
        });
      } else {
        if (this._data.object.id) {
          const country = this._data.object;
          country.name = this.form.get('name').value;

          this._countryService.update(country).subscribe({
            next: (country) => {
              this.dismiss(country);
            },
            error: (error) => {
              this._notification.showTimedErrorNotification(error.message);
            }
          });
        }
      }
    }
  }
}

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
  styleUrls: ['engine-type-dialog.css'],
})
export class EngineTypeDialog {
  private readonly _dialogRef = inject(MatDialogRef<EngineTypeDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _data = inject<IDialogData<EngineType> | null>(MAT_DIALOG_DATA);
  private readonly _engineTypeService: EngineTypeService = inject(EngineTypeService);
  private readonly _notification = inject(NotificationService);

  isView: boolean = true;
  isNewOrEdit: boolean = true;
  jsonCountryObject: string = '';
  form: FormGroup;

  constructor() {
    this.isView = this._data.isView;

    if (this._data.isView) {
      this.jsonCountryObject = AppUtil.toRawJSONText(this._data.object);

    } else if (this._data && this._data.object) {
      this.isNewOrEdit = false;
      this.form = this._fb.group({
        type: [this._data.object.type, Validators.required],
      });

    } else if (this._data && !this._data.object) {
      this.form = this._fb.group({
        type: ['', Validators.required],
      });
    }
  }

  dismiss(value: any) {
    this._dialogRef.close(value);
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
            this._notification.showTimedErrorNotification(error.message);
          }
        });
      } else {
        if (this._data.object.id) {
          const engineType = this._data.object;
          engineType.type = this.form.get('type').value;

          this._engineTypeService.update(engineType).subscribe({
            next: (engineType) => {
              this.dismiss(engineType);
            },
            error: (error) => {
              this._notification.showTimedErrorNotification(error.message);
            }
          });
        }
      }
    }
  }
}

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
  styleUrl: 'emission-class-dialog.css'
})
export class EmissionClassDialog {
  private readonly _dialogRef = inject(MatDialogRef<EmissionClassDialog>);
  private readonly _fb = inject(FormBuilder);
  private readonly _data = inject<IDialogData<EmissionClass> | null>(MAT_DIALOG_DATA);
  private readonly _emissionClassService: EmissionClassService = inject(EmissionClassService);
  private readonly _notification = inject(NotificationService);

  isView: boolean = true;
  isNewOrEdit: boolean = true;
  jsonCountryObject: string = '';
  form: FormGroup;

  constructor() {
    this.isView = this._data.isView;

    if (this._data.isView) {
      this.jsonCountryObject = AppUtil.toRawJSONText(this._data.object);

    } else if (this._data && this._data.object) {
      this.isNewOrEdit = false;
      this.form = this._fb.group({
        className: [this._data.object.className, Validators.required],
      });

    } else if (this._data && !this._data.object) {
      this.form = this._fb.group({
        className: ['', Validators.required],
      });
    }
  }

  dismiss(value: any) {
    this._dialogRef.close(value);
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
            console.log(emissionClass);
            this.dismiss(emissionClass);
          },
          error: (error) => {
            console.error(error);
            this._notification.showTimedErrorNotification(error.message);
          }
        });
      } else {
        if (this._data.object.id) {
          const emissionClass = this._data.object;
          emissionClass.className = this.form.get('className').value;

          this._emissionClassService.update(emissionClass).subscribe({
            next: (emissionClass) => {
              this.dismiss(emissionClass);
            },
            error: (error) => {
              this._notification.showTimedErrorNotification(error.message);
            }
          });
        }
      }
    }
  }
}
