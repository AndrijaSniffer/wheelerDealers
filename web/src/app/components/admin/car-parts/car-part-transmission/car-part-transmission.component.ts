import { Component, OnInit } from '@angular/core';
import {Fuel} from "../../../../classes/fuel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FuelService} from "../../../../services/car-parts-services/fuel.service";
import {MatDialog} from "@angular/material/dialog";
import {FuelDialogComponent} from "../../../dialogs/fuel-dialog/fuel-dialog.component";
import {Transmission} from "../../../../classes/transmission";
import {TransmissionService} from "../../../../services/car-parts-services/transmission.service";
import {TransmissionDialogComponent} from "../../../dialogs/transmission-dialog/transmission-dialog.component";

@Component({
  selector: 'app-car-part-transmission',
  templateUrl: './car-part-transmission.component.html',
  styleUrls: ['./car-part-transmission.component.css']
})
export class CarPartTransmissionComponent implements OnInit {
  data: Transmission[] = [];
  displayedColumns = ["id", "numberOfSpeeds", "transmissionType", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _transmissionService: TransmissionService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTransmission();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      transmissionType: new FormControl("", Validators.required),
      numberOfSpeeds: new FormControl(0, Validators.required)
    });
  }

  getTransmission(){
    this._transmissionService.getAllTrasmission().subscribe((res: Transmission[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_transmission: any) {
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
    const dialogRef = this.dialog.open(TransmissionDialogComponent, {
      data: {
        mode: mode,
        idTransmission: id_transmission,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getTransmission();
    })
  }

  submitForm() {
    this._transmissionService.createTransmission({transmission_type: this.form.value.transmissionType,
      number_of_speeds: this.form.value.numberOfSpeeds}).subscribe(() => {
      this.getTransmission();
    });
  }

}
