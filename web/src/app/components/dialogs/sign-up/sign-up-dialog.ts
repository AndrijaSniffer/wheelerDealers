import {Component, inject, ViewChild} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatStep, MatStepLabel, MatStepper} from '@angular/material/stepper';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {NgForOf, NgIf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../classes/user';

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
  templateUrl: 'sign-up.dialog.html',
  styleUrls: ['sign-up.dialog.css']
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
        this.isValidFile = false; // Mark as invalid
        this.selectedFile = null; // Reset selected file
        this.formCompany.patchValue({logo: ''}); // Clear the form control
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
