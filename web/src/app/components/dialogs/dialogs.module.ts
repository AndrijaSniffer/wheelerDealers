import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountryDialogComponent} from './country-dialog/country-dialog.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialSharedModule} from "../../shared/material-shared.module";
import { DriveDialogComponent } from './drive-dialog/drive-dialog.component';


@NgModule({
  declarations: [
    CountryDialogComponent,
    DriveDialogComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule,
    MaterialSharedModule
  ]
})
export class DialogsModule {
}
