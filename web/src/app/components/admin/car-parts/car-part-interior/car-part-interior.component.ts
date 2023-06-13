import { Component, OnInit } from '@angular/core';
import {Fuel} from "../../../../classes/fuel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FuelService} from "../../../../services/car-parts-services/fuel.service";
import {MatDialog} from "@angular/material/dialog";
import {FuelDialogComponent} from "../../../dialogs/fuel-dialog/fuel-dialog.component";
import {Interior} from "../../../../classes/interior";
import {InteriorService} from "../../../../services/car-parts-services/interior.service";
import {InteriorDialogComponent} from "../../../dialogs/interior-dialog/interior-dialog.component";

@Component({
  selector: 'app-car-part-interior',
  templateUrl: './car-part-interior.component.html',
  styleUrls: ['./car-part-interior.component.css']
})
export class CarPartInteriorComponent implements OnInit {
  data: Interior[] = [];
  displayedColumns = ["id", "numberOfDoors", "numberOfSeats", "leftSideSteeringWheel", "color", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _interiorService: InteriorService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.getInterior();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      numberOfDoors: new FormControl(3, Validators.required),
      numberOfSeats: new FormControl(3, Validators.required),
      leftSideSteeringWheel: new FormControl(true, Validators.required),
      color: new FormControl("")
    });
  }

  getInterior(){
    this._interiorService.getAllInterior().subscribe((res: Interior[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_interior: any) {
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
    const dialogRef = this.dialog.open(InteriorDialogComponent, {
      data: {
        mode: mode,
        idInterior: id_interior,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getInterior();
    })
  }

  submitForm() {
    this._interiorService.createInterior({
      numberOfDoors: this.form.value.numberOfDoors,
      numberOfSeats: this.form.value.numberOfSeats,
      leftSideSteeringWheel: this.form.value.leftSideSteeringWheel,
      color: this.form.value.color
    }).subscribe(() => {
      this.getInterior();
    });
  }
}
