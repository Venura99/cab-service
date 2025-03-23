import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutNewComponent } from 'src/app/layout/default-layout-new/default-layout-new.component';
import { ApproveDriverRegistrationsComponent } from './approve-driver-registrations/approve-driver-registrations.component';
import { DriverAccountsComponent } from './driver-accounts/driver-accounts.component';
import { DriverVehicleInfoComponent } from './driver-vehicle-info/driver-vehicle-info.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: ApproveDriverRegistrationsComponent,
      },
    ],
  },

  {
    path: "driver-accounts",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: DriverAccountsComponent,
      },
    ],
  },

  {
    path: "driver-Information",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: DriverVehicleInfoComponent,
      },
    ],
  },

  {
    path: "customer-accounts",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: CustomerAccountsComponent,
      },
    ],
  },

  {
    path: "booking-management",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: BookingManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDriverPanelRoutingModule { }
