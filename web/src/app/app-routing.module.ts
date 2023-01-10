import {NotfoundComponent} from './shared/notfound/notfound.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from "./guard/admin-guard";

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./components/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./components/login-management/login-management.module').then(
        (m) => m.LoginManagementModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then(
        (m) => m.AdminModule
      ),
    canActivate: [AdminGuard]
  },
  {path: '', redirectTo: 'main/home', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
