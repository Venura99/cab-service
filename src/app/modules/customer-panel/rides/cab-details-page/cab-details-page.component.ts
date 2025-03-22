import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-cab-details-page',
  templateUrl: './cab-details-page.component.html',
  styleUrls: ['./cab-details-page.component.scss']
})
export class CabDetailsPageComponent {
FV = new CommonForm();
selectedData:any;
constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // private transactionService: TransactionHandlerService,
    // private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    // private clientIpHandle: ClientIpHandleService,

    // private sidebarService: SidebarService,
    // private appComponent: AppComponent,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    debugger
    this.selectedData = this.config.data;
  }

   createForm() {
          this.FV.formGroup = this.formBuilder.group({
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
            distance: ["", Validators.required],
            description: ["", ],
          });
        }

  confirmBooking(){
    debugger
    if(this.FV.validateControllers("startDate,endDate,distance")){
      this.messageService.showErrorAlert('Please fill all the required fields!');
      return;
    }

    const inputValue:any = {
      startDate: this.FV.getValue("startDate"),
      endDate: this.FV.getValue("endDate"),
      distance: this.FV.getValue("distance"),
      description: this.FV.getValue("description"),
    }
    let confirmationConfig = {
      message: "Are you sure you want to confirm this booking?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.ref.close(inputValue);
        }
      }
    );
  }
}
