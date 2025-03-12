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
      { field: "id", header: "ID" },
      { field: "fname", header: "First Name" },
      { field: "lname", header: "Last Name" },
      { field: "mobile", header: "Mobile" },
      { field: "vType", header: "Vehicle Type" },
      { field: "vNo", header: "Vehicle No" },
    ];

    this.records = [
      {
        id: 1,
        fname: "Kasun",
        lname: "Gunawardana",
        mobile: "0777545852",
        vType: "Nissan FB50",
        vNo: "WP-635125",
        status: "Pending",
      },
      {
        id: 2,
        fname: "Palitha",
        lname: "Perera",
        mobile: "0784589631",
        vType: "Honda Fit",
        vNo: "WP-244343",
        status: "Pending",
      },
      {
        id: 3,
        fname: "Nuwan",
        lname: "Kulasekara",
        mobile: "0768454545",
        vType: "Alto 2014",
        vNo: "WP-435354",
        status: "Approved",
      },
      {
        id: 3,
        fname: "Lasith",
        lname: "Malinga",
        mobile: "0725449541",
        vType: "Suzyki Alto X453",
        vNo: "SP-466756",
        status: "Approved",
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
