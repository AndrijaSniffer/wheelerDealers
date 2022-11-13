import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialSharedModule } from 'src/app/shared/material-shared.module';

const routes: Routes = [{
  path:'',
  component:ProfileComponent
}];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialSharedModule],
})
export class ProfileModule {}
