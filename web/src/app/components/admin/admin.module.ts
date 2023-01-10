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
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    GeneralComponent,
    UsersComponent,
    CarPartsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes), MaterialSharedModule, MatTableModule, MatExpansionModule
    ]
})
export class AdminModule {
}
