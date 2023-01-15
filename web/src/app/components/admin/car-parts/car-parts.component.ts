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



  constructor(private formBuilder: FormBuilder, private _driveService: DriveService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

  }

}
