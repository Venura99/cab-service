import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

import { CustomerPanelRoutingModule } from './customer-panel-routing.module';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    RegisterDriverComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    CustomerPanelRoutingModule,
    MenubarModule,
    ReactiveFormsModule,
    CarouselModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    StyleClassModule,
    InputTextareaModule,
    BadgeModule,
    MenuModule,
    MultiSelectModule,
    ToggleButtonModule,
    TagModule,
    DropdownModule,
    FormsModule,
    AccordionModule
  ]
})
export class CustomerPanelModule { }
