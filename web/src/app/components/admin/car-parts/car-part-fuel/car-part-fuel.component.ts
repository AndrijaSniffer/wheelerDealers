import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Fuel} from "../../../../classes/fuel";
import {FuelService} from "../../../../services/car-parts-services/fuel.service";
import {FuelDialogComponent} from "../../../dialogs/fuel-dialog/fuel-dialog.component";

@Component({
  selector: 'app-car-part-fuel',
  templateUrl: './car-part-fuel.component.html',
  styleUrls: ['./car-part-fuel.component.css']
})
export class CarPartFuelComponent implements OnInit {
  data: Fuel[] = [];
  displayedColumns = ["id", "fuelName", "kml", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _fuelService: FuelService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.getFuel();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fuelName: new FormControl("", Validators.required),
      kml: new FormControl(0)
    });
  }

  getFuel(){
    this._fuelService.getAllFuel().subscribe((res: Fuel[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_fuel: any) {
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
    const dialogRef = this.dialog.open(FuelDialogComponent, {
      data: {
        mode: mode,
        idFuel: id_fuel,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getFuel();
    })
  }

  submitForm() {
    this._fuelService.createFuel({fuelName: this.form.value.fuelName, kml: this.form.value.kml}).subscribe(() => {
      this.getFuel();
    });
  }

}
