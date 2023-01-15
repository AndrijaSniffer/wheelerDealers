import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralComponent} from './admin/general/general.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialSharedModule} from "../../shared/material-shared.module";
import {AdminComponent} from './admin/admin.component';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import { UsersComponent } from './users/users.component';
import { CarPartsComponent } from './car-parts/car-parts.component';
import { CarPartDriveComponent } from './car-parts/car-part-drive/car-part-drive.component';
import { CarPartEngineTypeComponent } from './car-parts/car-part-engine-type/car-part-engine-type.component';
import { CarPartEngineComponent } from './car-parts/car-part-engine/car-part-engine.component';
import { CarPartFuelComponent } from './car-parts/car-part-fuel/car-part-fuel.component';
import { CarPartInteriorComponent } from './car-parts/car-part-interior/car-part-interior.component';
import { CarPartTransmissionComponent } from './car-parts/car-part-transmission/car-part-transmission.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CarPropertiesComponent } from './car-properties/car-properties.component';
import { CarPropertiesManufacturerComponent } from './car-properties/car-properties-manufacturer/car-properties-manufacturer.component';
import { CarPropertiesModelTypeComponent } from './car-properties/car-properties-model-type/car-properties-model-type.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'parts',
        component: CarPartsComponent
      },
      {
        path: 'properties',
        component: CarPropertiesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    GeneralComponent,
    UsersComponent,
    CarPartsComponent,
    CarPartDriveComponent,
    CarPartEngineTypeComponent,
    CarPartEngineComponent,
    CarPartFuelComponent,
    CarPartInteriorComponent,
    CarPartTransmissionComponent,
    CarPropertiesComponent,
    CarPropertiesManufacturerComponent,
    CarPropertiesModelTypeComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes), MaterialSharedModule, MatTableModule, MatExpansionModule, MatCheckboxModule
    ]
})
export class AdminModule {
}
