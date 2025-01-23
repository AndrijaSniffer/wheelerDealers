import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NgModule} from '@angular/core';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {ContactUsPageComponent} from './components/contact-us-page/contact-us-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent  },
  { path: 'search', component: SearchPageComponent },
  { path: 'contact', component: ContactUsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
