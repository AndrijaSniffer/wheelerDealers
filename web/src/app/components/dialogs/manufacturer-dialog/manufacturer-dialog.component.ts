import {Component, Inject, OnInit} from '@angular/core';
import {Interior} from "../../../classes/interior";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InteriorService} from "../../../services/car-parts-services/interior.service";
import {Manufacturer} from "../../../classes/manufacturer";
import {ManufacturerService} from "../../../services/car-properties-services/manufacturer.service";
import {Country} from "../../../classes/country";
import {CountryService} from "../../../services/country.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idManufacturer: number | null;
}

@Component({
  selector: 'app-manufacturer-dialog',
  templateUrl: './manufacturer-dialog.component.html',
  styleUrls: ['./manufacturer-dialog.component.css']
})
export class ManufacturerDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idManufacturer: number;
  manufacturer: Manufacturer = {id: 0, nameManufacturer: '', idCountry: {id: 0, nameCountry: ''}};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;
  dataCountries: Country[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<ManufacturerDialogComponent>,
              private formBuilder: FormBuilder,
              private _manufacturerService: ManufacturerService,
              private _countryService: CountryService) {
    this.mode = data.mode;
    this.idManufacturer = data.idManufacturer!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._manufacturerService.getManufacturerById(this.idManufacturer).subscribe((res: Manufacturer) => {
      this.manufacturer = res;
    })

    this._countryService.getAllCountry().subscribe((res: Country[]) => {
      this.dataCountries = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      nameManufacturer: new FormControl(this.manufacturer.nameManufacturer, Validators.required),
      countryId: new FormControl(this.manufacturer.idCountry, Validators.required)
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
        this._manufacturerService.deleteManufacturerById(this.idManufacturer).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._manufacturerService.updateManufacturer(this.idManufacturer, {
        nameManufacturer: this.editForm.value.nameManufacturer,
        idCountry: this.editForm.value.countryId
      }).subscribe(() => {
      });
    }
  }
}
