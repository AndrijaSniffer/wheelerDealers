import {Component, Inject, OnInit} from '@angular/core';
import {EngineType} from "../../../classes/engine-type";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EngineTypeService} from "../../../services/car-parts-services/engine-type.service";
import {Engine} from "../../../classes/engine";
import {EngineService} from "../../../services/car-parts-services/engine.service";


interface DialogData {
  buttons: { confirm: string, cancel: string };
  mode: "view" | "edit" | "delete";
  idEngine: number | null;
}
@Component({
  selector: 'app-engine-dialog',
  templateUrl: './engine-dialog.component.html',
  styleUrls: ['./engine-dialog.component.css']
})
export class EngineDialogComponent implements OnInit {
  mode: "view" | "edit" | "delete";
  idEngine: number;
  engine: Engine = {
    id_engine: 0,
    engine_code: '',
    kilowatt: 0,
    volume: 0,
    horsepower: 0,
    id_engine_type: {id_engine_type: 0, engine_type: ''}
  };
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';
  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<EngineDialogComponent>,
              private formBuilder: FormBuilder,
              private _engineService: EngineService) {
    this.mode = data.mode;
    this.idEngine = data.idEngine!;
    this.confirmButtonText = data.buttons.confirm;
    this.cancelButtonText = data.buttons.cancel;

    this._engineService.getEngineById(this.idEngine).subscribe((res: Engine) => {
      this.engine = res;
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      engineCode: new FormControl("", Validators.required),
      horsepower: new FormControl(""),
      kilowatt: new FormControl(""),
      volume: new FormControl("", Validators.required),
      idEngineType: new FormControl("", Validators.required),
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
        this._engineService.deleteEngineById(this.idEngine).subscribe(() => {
          this.dialogRef.close();
        });
        break;
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let e = new Engine()

      e.engine_code = this.editForm.value.engineCode;
      e.horsepower = this.editForm.value.horsepower;
      e.kilowatt = this.editForm.value.kilowatt;
      e.volume = this.editForm.value.volume;
      e.id_engine_type = this.editForm.value.idEngineType;

      this._engineService.updateEngine(this.idEngine, e).subscribe(() => {});
    }
  }

}
