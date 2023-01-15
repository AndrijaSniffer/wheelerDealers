import { Component, OnInit } from '@angular/core';
import {Drive} from "../../../../classes/drive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DriveService} from "../../../../services/car-parts-services/drive.service";
import {MatDialog} from "@angular/material/dialog";
import {DriveDialogComponent} from "../../../dialogs/drive-dialog/drive-dialog.component";

@Component({
  selector: 'app-car-part-drive',
  templateUrl: './car-part-drive.component.html',
  styleUrls: ['./car-part-drive.component.css']
})
export class CarPartDriveComponent implements OnInit {

  data: Drive[] = [];
  displayedColumns = ["id", "driveType", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _driveService: DriveService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.getDrives();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      driveType: new FormControl("", Validators.required)
    });
  }

  getDrives(){
    this._driveService.getAllDrive().subscribe((res: Drive[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_drive: any) {
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

  submitForm() {
    this._driveService.createDrive({drive_type: this.form.value.driveType}).subscribe(res => {
      this.getDrives();
    });
  }

}
