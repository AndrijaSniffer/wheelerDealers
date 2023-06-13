import { Component, OnInit } from '@angular/core';
import {Fuel} from "../../../../classes/fuel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FuelDialogComponent} from "../../../dialogs/fuel-dialog/fuel-dialog.component";
import {Manufacturer} from "../../../../classes/manufacturer";
import {ManufacturerService} from "../../../../services/car-properties-services/manufacturer.service";
import {CountryService} from "../../../../services/country.service";
import {Country} from "../../../../classes/country";
import {ManufacturerDialogComponent} from "../../../dialogs/manufacturer-dialog/manufacturer-dialog.component";

@Component({
  selector: 'app-car-properties-manufacturer',
  templateUrl: './car-properties-manufacturer.component.html',
  styleUrls: ['./car-properties-manufacturer.component.css']
})
export class CarPropertiesManufacturerComponent implements OnInit {

  data: Manufacturer[] = [];
  dataCountries: Country[] = [];
  displayedColumns = ["id", "nameManufacturer", "countryName", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _manufacturerService: ManufacturerService,
              private dialog: MatDialog, private _countryService: CountryService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getManufacturer();

    this._countryService.getAllCountry().subscribe((res: Country[]) => {
      this.dataCountries = res;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameManufacturer: new FormControl("", Validators.required),
      countryId: new FormControl(0, Validators.required)
    });
  }

  getManufacturer(){
    this._manufacturerService.getAllManufacturer().subscribe((res: Manufacturer[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_manufacturer: any) {
    let buttons: {confirm: string, cancel: string};
    switch (mode) {
      case "view":
        buttons = {
          confirm: "Ok",
          cancel: "Close"
        }
        break;
      case "edit":
        buttons = {
          confirm: "Save",
          cancel: "Discard"
        }
        break;
      case "delete":
        buttons = {
          confirm: "Delete",
          cancel: "Cancel"
        }
    }
    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      data: {
        mode: mode,
        idManufacturer: id_manufacturer,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getManufacturer();
    })
  }

  submitForm() {
    this._manufacturerService.createManufacturer({
      nameManufacturer: this.form.value.nameManufacturer,
      idCountry: this.form.value.countryId
    }).subscribe(() => {
      this.getManufacturer();
    });
  }

}
