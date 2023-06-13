import {Component, Inject, OnInit} from '@angular/core';
import {Fuel} from "../../../classes/fuel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelService} from "../../../services/car-parts-services/fuel.service";
import {TransmissionService} from "../../../services/car-parts-services/transmission.service";
import {Transmission} from "../../../classes/transmission";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idTransmission: number | null;
}

@Component({
  selector: 'app-transmission-dialog',
  templateUrl: './transmission-dialog.component.html',
  styleUrls: ['./transmission-dialog.component.css']
})
export class TransmissionDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idTransmission: number;
  transmission: Transmission = {id: 0, transmissionType: '', numberOfGears: 0};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<TransmissionDialogComponent>,
              private formBuilder: FormBuilder,
              private _transmissionService: TransmissionService) {
    this.mode = data.mode;
    this.idTransmission = data.idTransmission!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._transmissionService.getTrasmissionById(this.idTransmission).subscribe((res: Transmission) => {
      this.transmission = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      transmissionType: new FormControl(this.transmission.transmissionType, Validators.required),
      numberOfSpeeds: new FormControl(this.transmission.numberOfGears, Validators.required)
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
        this._transmissionService.deleteTrasmissionById(this.idTransmission).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._transmissionService.updateTransmission(this.idTransmission, this.editForm.value.transmissionType,
        this.editForm.value.numberOfSpeeds).subscribe(() => {});
    }
  }
}
