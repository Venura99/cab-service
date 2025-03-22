import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";

@Component({
  selector: "app-approve-driver-registrations",
  templateUrl: "./approve-driver-registrations.component.html",
  styleUrls: ["./approve-driver-registrations.component.scss"],
})
export class ApproveDriverRegistrationsComponent {
  cols: any;
  records: any[] = [];

  constructor(
    private transactionService: TransactionHandlerService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: "userId", header: "ID" },
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "phoneNumber", header: "Mobile" },
      { field: "nicNumber", header: "NIC" },
      { field: "status", header: "Status" },
    ];

    this.loadInitialData();
  }

  async loadInitialData() {
    debugger
    try {

      const userResult:any = await firstValueFrom(
          this.transactionService.getAllUsers(3,true),
      );
      debugger
      if (userResult.IsSuccessful) {
        this.records = userResult.Result;
      }

      if (!userResult.IsSuccessful) {
        this.messageService.showErrorAlert(userResult.Message);
      }
    } catch (error: any) {
      this.messageService.showErrorAlert(error);
    }
  }

  clickAddNew() {
    let header = "Add New Salary";
    let data = "";
    let width = "50vw";

    // this.popupService.OpenModelPrint(AddNewSalaryComponent, { header, data, width }).subscribe((result) => { })
  }
  approveRegistrations(e: any) {
    try {
      let confirmationConfig = {
        message: "Are you sure, Do you want to approve driver?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
      };
      debugger
      this.messageService.ConfirmPopUp(confirmationConfig, (isConfirm: boolean) => {
        if (isConfirm) {
          this.transactionService.approveUser(e.userId).subscribe((response) => {
            if (response.IsSuccessful) {
              this.messageService.showSuccessAlert(response.Message);
              this.loadInitialData();
            } else {
              this.messageService.showErrorAlert(response.Message);
            }
          });
        }
      });
    } catch (error: any) {
      this.messageService.showErrorAlert(error);
    }
  }


  deleteUser(e: any) {
    try {
      let confirmationConfig = {
        message: "Are you sure, Do you want to delete driver?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
      };
      debugger
      this.messageService.ConfirmPopUp(confirmationConfig, (isConfirm: boolean) => {
        if (isConfirm) {
          this.transactionService.removeUser(e.userId).subscribe((response) => {
            if (response.IsSuccessful) {
              this.messageService.showSuccessAlert(response.Message);
              this.loadInitialData();
            } else {
              this.messageService.showErrorAlert(response.Message);
            }
          });
        }
      });
    } catch (error: any) {
      this.messageService.showErrorAlert(error);
    }
  }
}
