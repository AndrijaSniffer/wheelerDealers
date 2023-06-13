import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Fuel} from "../../../classes/fuel";
import {FuelService} from "../../../services/car-parts-services/fuel.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idFuel: number | null;
}

@Component({
  selector: 'app-fuel-dialog',
  templateUrl: './fuel-dialog.component.html',
  styleUrls: ['./fuel-dialog.component.css']
})
export class FuelDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idFuel: number;
  fuel: Fuel = {id: 0, fuelName: '', kml: 0};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<FuelDialogComponent>,
              private formBuilder: FormBuilder,
              private _fuelService: FuelService) {
    this.mode = data.mode;
    this.idFuel = data.idFuel!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._fuelService.getFuelById(this.idFuel).subscribe((res: Fuel) => {
      this.fuel = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      fuelName: new FormControl(this.fuel.fuelName, Validators.required),
      kml: new FormControl(this.fuel.kml)
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
        this._fuelService.deleteFuelById(this.idFuel).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._fuelService.updateFuel(this.idFuel, this.editForm.value.fuelName, this.editForm.value.kml).subscribe(() => {});
    }
  }

}
