// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { DefaultLayoutNewComponent } from './layout/default-layout-new/default-layout-new.component';
import { ApproveDriverRegistrationsComponent } from './modules/admin-driver-panel/approve-driver-registrations/approve-driver-registrations.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { RouteGuardService } from './shared/services/route-guard.service';

const routes: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  {
    path: 'approve-registrations',
    component: DefaultLayoutNewComponent,
    children: [{ path: '', component: ApproveDriverRegistrationsComponent }]
  },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'driver',
    loadChildren: () => import('./modules/admin-driver-panel/admin-driver-panel.module')
      .then(m => m.AdminDriverPanelModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module')
      .then(m => m.UserModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/report-management/report-management.module')
      .then(m => m.ReportManagementModule)
  },
  {
  path: 'customer-panel',
  loadChildren: () => import('./modules/customer-panel/customer-panel.module')
    .then(m => m.CustomerPanelModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }