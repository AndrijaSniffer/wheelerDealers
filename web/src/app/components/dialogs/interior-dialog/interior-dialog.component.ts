import {Component, Inject, OnInit} from '@angular/core';
import {Fuel} from "../../../classes/fuel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelService} from "../../../services/car-parts-services/fuel.service";
import {Interior} from "../../../classes/interior";
import {InteriorService} from "../../../services/car-parts-services/interior.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idInterior: number | null;
}

@Component({
  selector: 'app-interior-dialog',
  templateUrl: './interior-dialog.component.html',
  styleUrls: ['./interior-dialog.component.css']
})
export class InteriorDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idInterior: number;
  interior: Interior = {id_interior: 0, number_of_doors: 0, number_of_seats: 0, left_side_steering_wheel: true, color: ''};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<InteriorDialogComponent>,
              private formBuilder: FormBuilder,
              private _interiorService: InteriorService) {
    this.mode = data.mode;
    this.idInterior = data.idInterior!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._interiorService.getInteriorById(this.idInterior).subscribe((res: Interior) => {
      this.interior = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      numberOfDoors: new FormControl(this.interior.number_of_doors, Validators.required),
      numberOfSeats: new FormControl(this.interior.number_of_seats, Validators.required),
      leftSideSteeringWheel: new FormControl(this.interior.left_side_steering_wheel, Validators.required),
      color: new FormControl(this.interior.color)
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
        this._interiorService.deleteInteriorById(this.idInterior).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let formValues = this.editForm.value
      this._interiorService.updateInterior(this.idInterior, {number_of_doors: formValues.numberOfDoors,
      number_of_seats: formValues.numberOfSeats,
      left_side_steering_wheel: formValues.leftSideSteeringWheel,
      color: formValues.color}).subscribe(() => {});
    }
  }
}
