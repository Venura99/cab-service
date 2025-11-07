// customer-panel-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RidesComponent } from './rides/rides.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { CustomerLayoutComponent } from 'src/app/layout/customer-layout/customer-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'rides', component: RidesComponent },
      { path: 'customer-profile', component: CustomerProfileComponent },
      { path: 'vehicle/:id', component: VehicleDetailComponent },
      // add more pages here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPanelRoutingModule {}