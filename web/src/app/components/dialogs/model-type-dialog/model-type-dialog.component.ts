import {Component, Inject, OnInit} from '@angular/core';
import {Manufacturer} from "../../../classes/manufacturer";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Country} from "../../../classes/country";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ManufacturerService} from "../../../services/car-properties-services/manufacturer.service";
import {CountryService} from "../../../services/country.service";
import {ModelType} from "../../../classes/model-type";
import {ModelTypeService} from "../../../services/car-properties-services/model-type.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idModelType: number | null;
}

@Component({
  selector: 'app-model-type-dialog',
  templateUrl: './model-type-dialog.component.html',
  styleUrls: ['./model-type-dialog.component.css']
})
export class ModelTypeDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idModelType: number;
  modelType: ModelType = {id: 0, typeName: ''};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<ModelTypeDialogComponent>,
              private formBuilder: FormBuilder,
              private _modelTypeService: ModelTypeService) {
    this.mode = data.mode;
    this.idModelType = data.idModelType!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._modelTypeService.getModelTypeById(this.idModelType).subscribe((res: ModelType) => {
      this.modelType = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      typeName: new FormControl(this.modelType.typeName, Validators.required)
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
        this._modelTypeService.deleteModelTypeById(this.idModelType).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._modelTypeService.updateModelType(this.idModelType, {typeName: this.editForm.value.typeName}).subscribe(() => {
      });
    }
  }

}
