import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPanelRoutingModule } from './customer-panel-routing.module';
import { RegisterDriverComponent } from './register-driver/register-driver.component';


@NgModule({
  declarations: [
    RegisterDriverComponent
  ],
  imports: [
    CommonModule,
    CustomerPanelRoutingModule
  ]
})
export class CustomerPanelModule { }
