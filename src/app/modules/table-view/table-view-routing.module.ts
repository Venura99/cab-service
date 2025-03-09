import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutNewComponent } from 'src/app/layout/default-layout-new/default-layout-new.component';
import { TableManagementComponent } from './table-management/table-management.component';


const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: TableManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableViewRoutingModule { }
