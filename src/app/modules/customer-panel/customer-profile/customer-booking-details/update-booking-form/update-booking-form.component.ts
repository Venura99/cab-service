import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
@Component({
  selector: 'app-update-booking-form',
  templateUrl: './update-booking-form.component.html',
  styleUrls: ['./update-booking-form.component.scss']
})
export class UpdateBookingFormComponent {
  FV = new CommonForm();
  selectedData:any;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private datePipe: DatePipe,
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
      this.setBookingData(this.selectedData);
    }
  
     createForm() {
            this.FV.formGroup = this.formBuilder.group({
              startDate: ["", Validators.required],
              endDate: ["", Validators.required],
              distance: ["", Validators.required],
              description: ["", ],
            });
          }
  
      setBookingData(data:any){
        this.FV.setValue("startDate", this.datePipe.transform(data.startDate, 'yyyy-MM-dd'));
        this.FV.setValue("endDate", this.datePipe.transform(data.endDate, 'yyyy-MM-dd'));
        this.FV.setValue("distance", data.distance);
        this.FV.setValue("description", data.description);
      }

      getCurrentDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
  