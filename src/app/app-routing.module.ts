import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SignInComponent } from "./modules/user/sign-in/sign-in.component";
import { DefaultLayoutNewComponent } from "./layout/default-layout-new/default-layout-new.component";
import { DefaultDashboardComponent } from "./layout/default-dashboard/default-dashboard.component";
import { RouteGuardService } from "./shared/services/route-guard.service";
import { ApproveDriverRegistrationsComponent } from "./modules/admin-driver-panel/approve-driver-registrations/approve-driver-registrations.component";

const routes: Routes = [
  { path: "", component: SignInComponent, pathMatch: "full" },
  { path: "login", component: SignInComponent },
  {
    path: "approve-registrations",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: ApproveDriverRegistrationsComponent,
      },
    ],
  },
  {
    path: "driver",
    loadChildren: () =>
      import("./modules/admin-driver-panel/admin-driver-panel.module").then(
        (m) => m.AdminDriverPanelModule
      ),
    // canActivate: [RouteGuardService],
  },

  {
    path: "user",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
    canActivate: [RouteGuardService],
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./modules/report-management/report-management.module").then(
        (m) => m.ReportManagementModule
      ),
    // canActivate: [RouteGuardService],
  },
  {
    path: "customer-panel",
    loadChildren: () =>
      import("./modules/customer-panel/customer-panel.module").then(
        (m) => m.CustomerPanelModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // imports: [
  //     RouterModule.forRoot([
  //         {
  //             path: '', component: AppMainComponent,
  //             // children: [
  //             //     {path: 'blocks', component: BlocksComponent},
  //             // ]
  //         },
  //         {path: '**', redirectTo: '/notfound'},
  //     ], {scrollPositionRestoration: 'enabled'})
  // ],
  // exports: [RouterModule]
})
export class AppRoutingModule {}
