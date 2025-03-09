import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDriverPanelRoutingModule } from './admin-driver-panel-routing.module';
import { ApproveDriverRegistrationsComponent } from './approve-driver-registrations/approve-driver-registrations.component';
import { DriverAccountsComponent } from './driver-accounts/driver-accounts.component';
import { DriverVehicleInfoComponent } from './driver-vehicle-info/driver-vehicle-info.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';


@NgModule({
  declarations: [
    ApproveDriverRegistrationsComponent,
    DriverAccountsComponent,
    DriverVehicleInfoComponent,
    CustomerAccountsComponent
  ],
  imports: [
    CommonModule,
    AdminDriverPanelRoutingModule
  ]
})
export class AdminDriverPanelModule { }
