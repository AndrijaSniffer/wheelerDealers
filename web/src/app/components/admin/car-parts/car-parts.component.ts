import { Component, OnInit } from '@angular/core';
import {Drive} from "../../../classes/drive";
import {DriveService} from "../../../services/car-parts-services/drive.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DriveDialogComponent} from "../../dialogs/drive-dialog/drive-dialog.component";

@Component({
  selector: 'app-car-parts',
  templateUrl: './car-parts.component.html',
  styleUrls: ['./car-parts.component.css']
})
export class CarPartsComponent implements OnInit {

  driveData: Drive[] = [];
  displayedDriveColumns = ["id", "driveType", "options"];
  driveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _driveService: DriveService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildDriveForm();

    this.getDrives();
  }

  buildDriveForm() {
    this.driveForm = this.formBuilder.group({
      driveType: new FormControl("", Validators.required)
    });
  }

  getDrives(){
    this._driveService.getAllDrive().subscribe((res: Drive[]) => {
      this.driveData = res;
    })
  }

  openDrivesDialog(mode: "view" | "edit" | "delete", id_drive: any) {
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
    const dialogRef = this.dialog.open(DriveDialogComponent, {
      data: {
        mode: mode,
        idDrive: id_drive,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getDrives();
    })
  }

  submitDriveForm() {
    this._driveService.createDrive({drive_type: this.driveForm.value.driveType}).subscribe(res => {
      this.getDrives();
    });
  }
}
