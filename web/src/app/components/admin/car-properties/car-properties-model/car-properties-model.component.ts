import {Component, OnInit} from '@angular/core';
import {Manufacturer} from "../../../../classes/manufacturer";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ManufacturerService} from "../../../../services/car-properties-services/manufacturer.service";
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerDialogComponent} from "../../../dialogs/manufacturer-dialog/manufacturer-dialog.component";
import {Model} from "../../../../classes/model";
import {Engine} from "../../../../classes/engine";
import {ModelService} from "../../../../services/model.service";
import {EngineService} from "../../../../services/car-parts-services/engine.service";

@Component({
  selector: 'app-car-properties-model',
  templateUrl: './car-properties-model.component.html',
  styleUrls: ['./car-properties-model.component.css']
})
export class CarPropertiesModelComponent implements OnInit {
  data: Model[] = [];
  dataManufacturer: Manufacturer[] = [];
  dataEngine: Engine[] = [];
  displayedColumns = ["id", "nameModel", "manufacturerName", "engineCode", "options"];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _modelService: ModelService,
              private dialog: MatDialog, private _manufacturerService: ManufacturerService,
              private _engineService: EngineService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getModel();

    this._manufacturerService.getAllManufacturer().subscribe((res: Manufacturer[]) => {
      this.dataManufacturer = res;
    })

    this._engineService.getAllEngine().subscribe((res: Engine[]) => {
      this.dataEngine = res;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameModel: new FormControl("", Validators.required),
      yearOfManufacture: new FormControl(0, Validators.required),
      manufacturerId: new FormControl(0, Validators.required),
      engineId: new FormControl(0, Validators.required)
    });
  }

  getModel() {
    this._modelService.getAllModel().subscribe((res: Model[]) => {
      this.data = res;
    })
  }

  openDialog(mode: "view" | "edit" | "delete", id_manufacturer: any) {
    let buttons: { confirm: string, cancel: string };
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
    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      data: {
        mode: mode,
        idManufacturer: id_manufacturer,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getModel();
    })
  }

  submitForm() {
    this._modelService.createModel({
      yearOfManufacture: this.form.value.yearOfManufacture,
      idManufacturer: this.form.value.manufacturerId,
      nameModel: this.form.value.nameModel,
      idEngine: this.form.value.engineId
    }).subscribe(() => {
      this.getModel();
    });
  }

}
