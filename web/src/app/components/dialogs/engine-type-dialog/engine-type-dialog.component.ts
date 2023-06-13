import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EngineType} from "../../../classes/engine-type";
import {EngineTypeService} from "../../../services/car-parts-services/engine-type.service";

interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idEngineType: number | null;
}

@Component({
  selector: 'app-engine-type-dialog',
  templateUrl: './engine-type-dialog.component.html',
  styleUrls: ['./engine-type-dialog.component.css']
})
export class EngineTypeDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idEngineType: number;
  engineType: EngineType = {id: 0, engineType: ''};
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<EngineTypeDialogComponent>,
              private formBuilder: FormBuilder,
              private _engineTypeService: EngineTypeService) {
    this.mode = data.mode;
    this.idEngineType = data.idEngineType!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._engineTypeService.getEngineTypeById(this.idEngineType).subscribe((res: EngineType) => {
      this.engineType = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      engineType: new FormControl("", Validators.required)
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
        this._engineTypeService.deleteEngineTypeById(this.idEngineType).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      this._engineTypeService.updateEngineType(this.idEngineType, this.editForm.value.engineType).subscribe(() => {});
    }
  }
}
