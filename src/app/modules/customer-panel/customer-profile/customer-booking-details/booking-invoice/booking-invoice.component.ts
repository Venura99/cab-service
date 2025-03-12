import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-booking-invoice',
  templateUrl: './booking-invoice.component.html',
  styleUrls: ['./booking-invoice.component.scss']
})
export class BookingInvoiceComponent {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  hotelName: any
  odPrintDetails: any
  odDetailResponse: any
  odSignatureResponse: any = [
    { signatureText: 'Signature', signatureSubText: 'Authorized User' },
    { signatureText: 'Signature', signatureSubText: 'Authorized User' },
  ]
  authorizedUsersList: any
  ResName: any

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    // this.sidebarService.setFooterTemplate(this.templateRef);
    console.log('Order Details', this.config.data)
    this.odPrintDetails = this.config.data
    this.odDetailResponse = this.config.data.items
    this.ResName = this.config.data.resName
    this.hotelName = this.config.data.hotelName
  }
}
