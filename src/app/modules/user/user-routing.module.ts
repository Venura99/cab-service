import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultLayoutNewComponent } from "src/app/layout/default-layout-new/default-layout-new.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: SignInComponent,
      },
    ],
  },

  // { path: "personal", component: PersonalDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
