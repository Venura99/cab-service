import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-cab-details-page',
  templateUrl: './cab-details-page.component.html',
  styleUrls: ['./cab-details-page.component.scss']
})
export class CabDetailsPageComponent {
selectedData:any;
constructor(
    private router: Router,
    // private formBuilder: FormBuilder,
    // private transactionService: TransactionHandlerService,
    // private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    // private clientIpHandle: ClientIpHandleService,

    // private sidebarService: SidebarService,
    // private appComponent: AppComponent,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
  }

  ngOnInit(): void {
    debugger
    this.selectedData = this.config.data;
  }

  confirmBooking(){
    let confirmationConfig = {
      message: "Are you sure you want to confirm this booking?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.ref.close();
          this.messageService.showSuccessAlert('Congratulations, Your Booking Successfully!');
        }
      }
    );
  }
}
