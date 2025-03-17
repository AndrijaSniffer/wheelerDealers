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
import {TransmissionComponent} from './components/admin/transmission/transmission.component';
import {FuelComponent} from './components/admin/fuel/fuel.component';
import {InteriorComponent} from './components/admin/interior/interior.component';
import {DrivetrainComponent} from './components/admin/drivetrain/drivetrain.component';
import {ManufacturerComponent} from './components/admin/manufacturer/manufacturer.component';
import {EngineComponent} from './components/admin/engine/engine.component';
import {ModelComponent} from './components/admin/model/model.component';
import {CarComponent} from './components/admin/car/car.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent, canActivate: [NoAdminGuard]},
  {path: 'search', component: SearchPageComponent, canActivate: [NoAdminGuard]},
  {path: 'contact', component: ContactUsPageComponent, canActivate: [NoAdminGuard]},
  {path: 'admin/countryManagement', component: CountryComponent, canActivate: [AdminGuard]},
  {path: 'admin/engineTypeManagement', component: EngineTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/emissionClassManagement', component: EmissionClassComponent, canActivate: [AdminGuard]},
  {path: 'admin/modelTypeManagement', component: ModelTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/transmissionManagement', component: TransmissionComponent, canActivate: [AdminGuard]},
  {path: 'admin/fuelManagement', component: FuelComponent, canActivate: [AdminGuard]},
  {path: 'admin/interiorManagement', component: InteriorComponent, canActivate: [AdminGuard]},
  {path: 'admin/drivetrainManagement', component: DrivetrainComponent, canActivate: [AdminGuard]},
  {path: 'admin/manufacturerManagement', component: ManufacturerComponent, canActivate: [AdminGuard]},
  {path: 'admin/engineManagement', component: EngineComponent, canActivate: [AdminGuard]},
  {path: 'admin/modelManagement', component: ModelComponent, canActivate: [AdminGuard]},
  {path: 'admin/carManagement', component: CarComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
