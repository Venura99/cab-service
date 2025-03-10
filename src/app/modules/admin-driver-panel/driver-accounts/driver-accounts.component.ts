import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { DriverAccountsFormComponent } from "./driver-accounts-form/driver-accounts-form.component";

@Component({
  selector: "app-driver-accounts",
  templateUrl: "./driver-accounts.component.html",
  styleUrls: ["./driver-accounts.component.scss"],
})
export class DriverAccountsComponent {
  cols: any;
  records: any[] = [];

  constructor(
    public messageService: MessageService,
    private msgService: AppMessageService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: "userId", header: "ID" },
      { field: "firstName", header: "Driver Name" },
      { field: "test1", header: "Test" },
      { field: "test1", header: "Test" },
      { field: "test1", header: "Test" },
      { field: "test1", header: "Test" },
      { field: "test1", header: "Test" },
    ];

    this.records = [
      {
        userId: 1,
        firstName: "John",
        test1: "test1",
      },
      {
        userId: 1,
        firstName: "John",
        test1: "test1",
      },
      {
        userId: 1,
        firstName: "John",
        test1: "test1",
      },
      {
        userId: 1,
        firstName: "John",
        test1: "test1",
      },
    ];

    // this.loadInitialData()
  }

  // async loadInitialData() {
  //   try {
  //     debugger
  //     const [users]: any = await forkJoin([
  //       this.usersService.GetAllUsers()
  //     ]).toPromise()

  //     console.log(users.dataSet)

  //     users.isSuccessful ? this.records.push(users.dataSet) : this.msgService.showErrorAlert(users.message)

  //   } catch (error: any) {
  //     this.msgService.showErrorAlert(error)
  //   }
  // }

  clickAddNew() {
    let header = "Add New Driver";
    let data = "";
    let width = "50vw";

    // this.popupService
    //   .OpenModelPrint(AddNewLeaveComponent, { header, data, width })
    //   .subscribe((result) => {});
  }

  editDriver(e: any) {
    let header = "Edit Driver";
    let data = "";
    let width = "50vw";

    this.popupService
      .OpenModelPrint(DriverAccountsFormComponent, { header, data, width })
      .subscribe((result) => {});
  }

  viewLeave(e: any) {
    let header = "Leave Confirmation";
    let data = "";
    let width = "50vw";

    // this.popupService
    //   .OpenModelPrint(LeaveConfirmationComponent, { header, data, width })
    //   .subscribe((result) => {});
  }

  deleteUser(e: any) {
    try {
      let confirmationConfig = {
        message: "Are you sure you want to delete this record?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
      };

      this.msgService.ConfirmPopUp(
        confirmationConfig,
        (isConfirm: boolean) => {
          if (isConfirm) {
          }
        }
      );
    } catch (error: any) {
      this.msgService.showErrorAlert(error);
    }
  }
}
