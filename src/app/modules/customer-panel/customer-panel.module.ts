import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass'
import { BadgeModule } from 'primeng/badge';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { PasswordModule } from "primeng/password";
import { SidebarModule } from "primeng/sidebar";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { TooltipModule } from "primeng/tooltip";
import { SelectButtonModule } from "primeng/selectbutton";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { DividerModule } from "primeng/divider";
import { AccordionModule } from "primeng/accordion";
import { RadioButtonModule } from "primeng/radiobutton";
import { SplitButtonModule } from "primeng/splitbutton";
import { MenuModule } from "primeng/menu";
import { ChartModule } from "primeng/chart";
import { AvatarModule } from "primeng/avatar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { OrderListModule } from "primeng/orderlist";
import { ChipsModule } from "primeng/chips";
import { CardModule } from "primeng/card";
import { ToggleButtonModule } from "primeng/togglebutton";
import { InputNumberModule } from "primeng/inputnumber";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { StepsModule } from "primeng/steps";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { ChipModule } from "primeng/chip";
import { DataViewModule } from "primeng/dataview";
import { ImageModule } from "primeng/image";
import { TagModule } from "primeng/tag";
import { SharedModule } from "src/app/shared.module";
import { NgxPrintModule } from "ngx-print";
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';

import { CustomerPanelRoutingModule } from './customer-panel-routing.module';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RidesComponent } from './rides/rides.component';
import { CabDetailsPageComponent } from './rides/cab-details-page/cab-details-page.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerBookingDetailsComponent } from './customer-profile/customer-booking-details/customer-booking-details.component';
import { BookingInvoiceComponent } from './customer-profile/customer-booking-details/booking-invoice/booking-invoice.component';
import { CustomerEditDetailsComponent } from './customer-profile/customer-edit-details/customer-edit-details.component';
import { UpdateBookingFormComponent } from './customer-profile/customer-booking-details/update-booking-form/update-booking-form.component';


@NgModule({
  declarations: [
    RegisterDriverComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    RidesComponent,
    CabDetailsPageComponent,
    CustomerProfileComponent,
    CustomerBookingDetailsComponent,
    BookingInvoiceComponent,
    CustomerEditDetailsComponent,
    UpdateBookingFormComponent
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
    AccordionModule,
    TabMenuModule,

    FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        PasswordModule,
        SidebarModule,
        TableModule,
        MultiSelectModule,
        TooltipModule,
        SelectButtonModule,
        DropdownModule,
        CalendarModule,
        DividerModule,
        AccordionModule,
        RadioButtonModule,
        SplitButtonModule,
        MenuModule,
        ChartModule,
        AvatarModule,
        InputTextareaModule,
        OverlayPanelModule,
        OrderListModule,
        ChipsModule,
        CardModule,
        ToggleButtonModule,
        InputNumberModule,
        IconFieldModule,
        InputIconModule,
        InputGroupModule,
        InputGroupAddonModule,
        StepsModule,
        EditorModule,
        FieldsetModule,
        ChipModule,
        DataViewModule,
        TagModule,
        SharedModule,
        NgxPrintModule,
        NgxPrintModule,
        ImageModule,
        CarouselModule,
        TabViewModule
  ]
})
export class CustomerPanelModule { }
