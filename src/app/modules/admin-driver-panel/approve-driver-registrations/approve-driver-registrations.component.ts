import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PopupService } from "src/app/shared/services/popup.service";

@Component({
  selector: "app-approve-driver-registrations",
  templateUrl: "./approve-driver-registrations.component.html",
  styleUrls: ["./approve-driver-registrations.component.scss"],
})
export class ApproveDriverRegistrationsComponent {
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
      { field: "vNo", header: "Vehicle No" },
      { field: "status", header: "Status" },
    ];

    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      this.records = [
        {
          id: 1,
          fname: "Kasun",
          lname: "Gunawardana",
          mobile: "0777545852",
          vNo: "WP-635125",
          status: "Pending",
        },
        {
          id: 2,
          fname: "Palitha",
          lname: "Perera",
          mobile: "0784589631",
          vNo: "WP-244343",
          status: "Pending",
        },
        {
          id: 3,
          fname: "Nuwan",
          lname: "Kulasekara",
          mobile: "0768454545",
          vNo: "WP-435354",
          status: "Approved",
        },
        {
          id: 3,
          fname: "Lasith",
          lname: "Malinga",
          mobile: "0725449541",
          vNo: "SP-466756",
          status: "Approved",
        },
      ];
    } catch (error: any) {
      this.msgService.showErrorAlert(error);
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
        message: "Are you sure you want to approve driver?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
      };

      this.msgService.ConfirmPopUp(confirmationConfig, (isConfirm: boolean) => {
        if (isConfirm) {
        }
      });
    } catch (error: any) {
      this.msgService.showErrorAlert(error);
    }
  }
  deleteUser(e: any) {}
}
