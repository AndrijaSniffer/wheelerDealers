import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NgModule} from '@angular/core';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {ContactUsPageComponent} from './components/contact-us-page/contact-us-page.component';
import {CountryComponent} from './components/admin/country/country.component';
import {AdminGuard} from './guards/admin.guard';
import {NoAdminGuard} from './guards/no-admin.guard';
import {EngineTypeComponent} from './components/admin/engine-type/engine-type.component';
import {EmissionClassComponent} from './components/admin/emission-class/emission-class.component';
import {ModelTypeComponent} from './components/admin/model-type/model-type.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent, canActivate: [NoAdminGuard]},
  {path: 'search', component: SearchPageComponent, canActivate: [NoAdminGuard]},
  {path: 'contact', component: ContactUsPageComponent, canActivate: [NoAdminGuard]},
  {path: 'admin/countryManagement', component: CountryComponent, canActivate: [AdminGuard]},
  {path: 'admin/engineTypeManagement', component: EngineTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/emissionClassManagement', component: EmissionClassComponent, canActivate: [AdminGuard]},
  {path: 'admin/modelTypeManagement', component: ModelTypeComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
