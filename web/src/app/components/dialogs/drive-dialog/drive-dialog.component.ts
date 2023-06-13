import {Component, Inject, OnInit} from '@angular/core';
import {Drive} from "../../../classes/drive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DriveService} from "../../../services/car-parts-services/drive.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idDrive: number | null;
}

@Component({
  selector: 'app-drive-dialog',
  templateUrl: './drive-dialog.component.html',
  styleUrls: ['./drive-dialog.component.css']
})
export class DriveDialogComponent implements OnInit {

  mode: "view" | "edit" | "delete";
  idDrive: number;
  drive: Drive = {id: 0, driveType: ''};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<DriveDialogComponent>,
              private formBuilder: FormBuilder,
              private _driveService: DriveService) {
    this.mode = data.mode;
    this.idDrive = data.idDrive!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._driveService.getDriveById(this.idDrive).subscribe((res: Drive) => {
      this.drive = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      driveType: new FormControl("", Validators.required)
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
        this._driveService.deleteDriveById(this.idDrive).subscribe(response => {
          console.warn(response);
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._driveService.updateDrive(this.idDrive, this.editForm.value.driveType).subscribe(() => {});
    }
  }
}
