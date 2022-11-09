import { MaterialSharedModule } from './../../shared/material-shared.module';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ],
  },
];

@NgModule({
  declarations: [LandingPageComponent,HomeComponent,SearchComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialSharedModule],
})
export class LandingPageModule {}
