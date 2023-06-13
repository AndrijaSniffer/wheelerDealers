import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Engine} from "../../../../classes/engine";
import {EngineService} from "../../../../services/car-parts-services/engine.service";
import {EngineTypeService} from "../../../../services/car-parts-services/engine-type.service";
import {EngineType} from "../../../../classes/engine-type";
import {EngineDialogComponent} from "../../../dialogs/engine-dialog/engine-dialog.component";

@Component({
  selector: 'app-car-part-engine',
  templateUrl: './car-part-engine.component.html',
  styleUrls: ['./car-part-engine.component.css']
})
export class CarPartEngineComponent implements OnInit {
  data: Engine[] = [];
  dataEngineType: EngineType[] = [];
  displayedColumns = ["id", "engineCode", "horsepower", "kilowatt", "volume", "idEngineType", "engineType", "options"];
  form: FormGroup;
  isButtonDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private _engineService: EngineService,
              private dialog: MatDialog,
              private _engineTypeService: EngineTypeService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getEngines();
    this.getEngineTypes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      engineCode: new FormControl("", Validators.required),
      horsepower: new FormControl(""),
      kilowatt: new FormControl(""),
      volume: new FormControl("", Validators.required),
      engineType: new FormControl("", Validators.required),
    });
  }

  getEngines(){
    this._engineService.getAllEngine().subscribe((res: Engine[]) => {
      this.data = res;
    })
  }

  getEngineTypes(){
    this._engineTypeService.getAllEngineType().subscribe((res: EngineType[]) => {
      this.dataEngineType = res;
    })
  }

  hpOrKilowattChange(){
    this.isButtonDisabled = !(this.form.valid && (this.form.value.horsepower != null || this.form.value.kilowatt != null));
  }

  openDialog(mode: "view" | "edit" | "delete", id_engine: any) {
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
    const dialogRef = this.dialog.open(EngineDialogComponent, {
      data: {
        mode: mode,
        idEngine: id_engine,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getEngines();
    })
  }

  submitForm() {
    this._engineService.createEngine({
      engineCode: this.form.value.engineCode,
      volume: this.form.value.volume,
      idEngineType: this.form.value.engineType,
      horsepower: this.form.value.horsepower ?? null,
      kilowatt: this.form.value.kilowatt ?? null
    }).subscribe(() => {
      this.getEngines();
    });
  }
}
