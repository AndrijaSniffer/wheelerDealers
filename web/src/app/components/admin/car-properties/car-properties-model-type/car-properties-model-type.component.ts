import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModelType} from "../../../../classes/model-type";
import {ModelTypeService} from "../../../../services/car-properties-services/model-type.service";
import {ModelTypeDialogComponent} from "../../../dialogs/model-type-dialog/model-type-dialog.component";

@Component({
  selector: 'app-car-properties-model-type',
  templateUrl: './car-properties-model-type.component.html',
  styleUrls: ['./car-properties-model-type.component.css']
})
export class CarPropertiesModelTypeComponent implements OnInit {
  data: ModelType[] = [];
  displayedColumns = ["id", "typeName", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private _modelTypeService: ModelTypeService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getModelType();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      typeName: new FormControl("", Validators.required)
    });
  }

  getModelType(){
    this._modelTypeService.getAllModelType().subscribe((res: ModelType[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_model_type: any) {
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
    const dialogRef = this.dialog.open(ModelTypeDialogComponent, {
      data: {
        mode: mode,
        idManufacturer: id_model_type,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getModelType();
    })
  }

  submitForm() {
    this._modelTypeService.createModelType({type_name: this.form.value.typeName}).subscribe(() => {
      this.getModelType();
    });
  }

}
