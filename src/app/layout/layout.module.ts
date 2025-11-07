// src/app/layout/layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../modules/customer-panel/header/header.component';
import { FooterComponent } from '../modules/customer-panel/footer/footer.component';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

@NgModule({
  declarations: [
    CustomerLayoutComponent,
    HeaderComponent,    // ONLY HERE
    FooterComponent     // ONLY HERE
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    AutoCompleteModule,
    RippleModule
  ],
  exports: [
    CustomerLayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }