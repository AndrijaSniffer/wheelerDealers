import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EngineType} from "../../../../classes/engine-type";
import {EngineTypeService} from "../../../../services/car-parts-services/engine-type.service";
import {EngineTypeDialogComponent} from "../../../dialogs/engine-type-dialog/engine-type-dialog.component";

@Component({
  selector: 'app-car-part-engine-type',
  templateUrl: './car-part-engine-type.component.html',
  styleUrls: ['./car-part-engine-type.component.css']
})
export class CarPartEngineTypeComponent implements OnInit {
  data: EngineType[] = [];
  displayedColumns = ["id", "engineType", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _engineTypeService: EngineTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.getEngineTypes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      engineType: new FormControl("", Validators.required)
    });
  }

  getEngineTypes(){
    this._engineTypeService.getAllEngineType().subscribe((res: EngineType[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_engine_type: any) {
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
    const dialogRef = this.dialog.open(EngineTypeDialogComponent, {
      data: {
        mode: mode,
        idEngineType: id_engine_type,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getEngineTypes();
    })
  }

  submitForm() {
    this._engineTypeService.createEngineType({engineType: this.form.value.engineType}).subscribe(() => {
      this.getEngineTypes();
    });
  }
}
