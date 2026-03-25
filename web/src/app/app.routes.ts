import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from '@landing-page/landing-page.component';
import {NgModule} from '@angular/core';
import {SearchPageComponent} from '@search-page/search-page.component';
import {ContactUsPageComponent} from '@contact-us-page/contact-us-page.component';
import {CountryComponent} from '@admin/country/country.component';
import {AdminGuard} from '@guards/admin.guard';
import {NoAdminGuard} from '@guards/no-admin.guard';
import {EngineTypeComponent} from '@admin/engine-type/engine-type.component';
import {EmissionClassComponent} from '@admin/emission-class/emission-class.component';
import {ModelTypeComponent} from '@admin/model-type/model-type.component';
import {TransmissionTypeComponent} from '@admin/transmission/transmission-type.component';
import {FuelComponent} from '@admin/fuel/fuel.component';
import {DrivetrainComponent} from '@admin/drivetrain/drivetrain.component';
import {ManufacturerComponent} from '@admin/manufacturer/manufacturer.component';
import {ModelComponent} from '@admin/model/model.component';
import {CarComponent} from '@admin/car/car.component';
import {UserComponent} from '@admin/user/user.component';
import {ProfileComponent} from '@profile/profile.component';
import {UserGuard} from '@guards/user.guard';
import {DealershipDashboardComponent} from '@dealership/dashboard/dashboard.component';
import {DealershipGuard} from '@guards/dealership.guard';
import {InventoryComponent} from '@dealership/inventory/inventory.component';
import {CarDetailComponent} from '@car-detail/car-detail.component';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent, canActivate: [NoAdminGuard]},
  {path: 'search', component: SearchPageComponent, canActivate: [NoAdminGuard]},
  {path: 'contact', component: ContactUsPageComponent, canActivate: [NoAdminGuard]},
  {path: 'admin/countryManagement', component: CountryComponent, canActivate: [AdminGuard]},
  {path: 'admin/engineTypeManagement', component: EngineTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/emissionClassManagement', component: EmissionClassComponent, canActivate: [AdminGuard]},
  {path: 'admin/modelTypeManagement', component: ModelTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/transmissionManagement', component: TransmissionTypeComponent, canActivate: [AdminGuard]},
  {path: 'admin/fuelManagement', component: FuelComponent, canActivate: [AdminGuard]},
  {path: 'admin/drivetrainManagement', component: DrivetrainComponent, canActivate: [AdminGuard]},
  {path: 'admin/manufacturerManagement', component: ManufacturerComponent, canActivate: [AdminGuard]},
  {path: 'admin/modelManagement', component: ModelComponent, canActivate: [AdminGuard]},
  {path: 'admin/carManagement', component: CarComponent, canActivate: [AdminGuard]},
  {path: 'admin/userManagement', component: UserComponent, canActivate: [AdminGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'dealership/dashboard', component: DealershipDashboardComponent, canActivate: [DealershipGuard]},
  {path: 'dealership/inventory', component: InventoryComponent, canActivate: [DealershipGuard]},
  {path: 'car/:id', component: CarDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
