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
      { field: "test1", header: "Driver Name" },
      { field: "test2", header: "Test" },
      { field: "test3", header: "Test" },
      { field: "test4", header: "Test" },
      { field: "status", header: "Status" },
    ];

    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      this.records = [
        {
          id: 1,
          test1: "test1",
          test2: "test2",
          test3: "test3",
          test4: "test4",
          status: "Pending",
        },
        {
          id: 2,
          test1: "test1",
          test2: "test2",
          test3: "test3",
          test4: "test4",
          status: "Pending",
        },
        {
          id: 3,
          test1: "test1",
          test2: "test2",
          test3: "test3",
          test4: "test4",
          status: "Approved",
        },
        {
          id: 3,
          test1: "test1",
          test2: "test2",
          test3: "test3",
          test4: "test4",
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
