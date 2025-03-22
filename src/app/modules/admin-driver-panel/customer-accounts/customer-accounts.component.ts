import { Component } from '@angular/core';
import { MessageService } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { VehicleService } from 'src/app/shared/services/api-services/vehicle.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss']
})
export class CustomerAccountsComponent {
  cols: any;
    records: any[] = [];
  
    constructor(
      private transactionService: TransactionHandlerService,
      private vehicleService: VehicleService,
      private masterDataService: MasterDataService,
      private messageService: AppMessageService,
      private popupService: PopupService
    ) {}
  
    ngOnInit(): void {
      this.cols = [
        { field: "profileImage", header: "Profile" },
        { field: "firstName", header: "First Name" },
        { field: "lastName", header: "Last Name" },
        { field: "phoneNumber", header: "Mobile" },
        { field: "nicNumber", header: "NIC" },
        { field: "dateOfBirth", header: "Date Of Birth" },
      ];
      this.loadInitialData();
          
     }
  
     async loadInitialData() {
      debugger
      try {
  
        const usersResult:any = await firstValueFrom(
            this.transactionService.getAllUsers(1,true),
        );
        debugger
        if (usersResult.IsSuccessful) {
          this.records = usersResult.Result;
        }
  
        if (!usersResult.IsSuccessful) {
          this.messageService.showErrorAlert(usersResult.Message);
        }
      } catch (error: any) {
        this.messageService.showErrorAlert(error);
      }
    }
  
    clickOnViewUser(rowData:any){
        this.popupService
        .OpenModel(CustomerFormComponent, {
          header: "User Details",
          width: "40vw",
          data: rowData
        })
     }
  
     clickOnDeleteUser(rowData:any){
      let confirmationConfig = {
        message: "Are you sure you want to delete this user?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
      };
  
      this.messageService.ConfirmPopUp(
        confirmationConfig,
        (isConfirm: boolean) => {
          if (isConfirm) {
            this.transactionService.removeUser(rowData?.userId).subscribe((response) => {
              debugger
              if (response.IsSuccessful) {
                this.messageService.showSuccessAlert(response.Message);
                this.loadInitialData();
              } else {
                this.messageService.showErrorAlert(response.Message);
              }
          });
        }});
     }
  }
  