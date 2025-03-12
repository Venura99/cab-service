import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { RidesComponent } from "./rides/rides.component";
import { CustomerProfileComponent } from "./customer-profile/customer-profile.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "about-us",
    component: AboutUsComponent,
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
  },
  {
    path: "rides",
    component: RidesComponent,
  },
  {
    path: "cutomer-profile",
    component: CustomerProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPanelRoutingModule {}
