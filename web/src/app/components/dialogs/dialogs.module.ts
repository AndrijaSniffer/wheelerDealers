import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountryDialogComponent} from './country-dialog/country-dialog.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialSharedModule} from "../../shared/material-shared.module";
import { DriveDialogComponent } from './drive-dialog/drive-dialog.component';
import { EngineTypeDialogComponent } from './engine-type-dialog/engine-type-dialog.component';
import { EngineDialogComponent } from './engine-dialog/engine-dialog.component';
import { FuelDialogComponent } from './fuel-dialog/fuel-dialog.component';
import { InteriorDialogComponent } from './interior-dialog/interior-dialog.component';
import { TransmissionDialogComponent } from './transmission-dialog/transmission-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ManufacturerDialogComponent } from './manufacturer-dialog/manufacturer-dialog.component';
import { ModelTypeDialogComponent } from './model-type-dialog/model-type-dialog.component';
import { ModelDialogComponent } from './model-dialog/model-dialog.component';


@NgModule({
  declarations: [
    CountryDialogComponent,
    DriveDialogComponent,
    EngineTypeDialogComponent,
    EngineDialogComponent,
    FuelDialogComponent,
    InteriorDialogComponent,
    TransmissionDialogComponent,
    ManufacturerDialogComponent,
    ModelTypeDialogComponent,
    ModelDialogComponent,
  ],
    imports: [
        CommonModule,
        MatListModule,
        MatDialogModule,
        MaterialSharedModule,
        MatCheckboxModule
    ]
})
export class DialogsModule {
}
