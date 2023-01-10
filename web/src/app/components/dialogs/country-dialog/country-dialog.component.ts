import {Component, Inject, OnInit} from '@angular/core';
import {Country} from "../../../classes/country";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../services/country.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  countryId: number | null;
}

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent implements OnInit {

  mode: "view" | "edit" | "delete";
  countryId: number;
  country: Country = {id_country: 0, name_country: ''};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<CountryDialogComponent>,
              private _countryService: CountryService,
              private formBuilder: FormBuilder) {
    this.mode = data.mode;
    this.countryId = data.countryId!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._countryService.getCountryId(this.countryId).subscribe(response => {
      this.country = response as Country;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      countryName: new FormControl("", Validators.required)
    });
  }

  onConfirmClick() {
    switch (this.mode) {
      case "view":
        this.dialogRef.close();
        break;

      case "edit":
        this.submitEditForm();
        this.dialogRef.close();
        break;

      case "delete":
        this._countryService.deleteCountryById(this.countryId).subscribe(response => {
          console.warn(response);
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._countryService.updateCountryById(this.countryId, this.editForm.value.countryName).subscribe(response => {
        let country = response as Country;
        console.warn(country);
      });
    }
  }
}
