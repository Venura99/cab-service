import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { DriverAccountsFormComponent } from "./driver-accounts-form/driver-accounts-form.component";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { CloudinaryService } from "src/app/shared/services/api-services/cloudinary.service";
import { BookingService } from "src/app/shared/services/api-services/booking.service";
import { firstValueFrom, forkJoin } from "rxjs";
import { VehicleService } from "src/app/shared/services/api-services/vehicle.service";

@Component({
  selector: "app-driver-accounts",
  templateUrl: "./driver-accounts.component.html",
  styleUrls: ["./driver-accounts.component.scss"],
})
export class DriverAccountsComponent {
  cols: any;
  records: any[] = [];
  bookingData: any[] = [];
  driverData: any[] = [];
  vehicleId:any;
  constructor(
        private masterDataService: MasterDataService,
        private msgService: AppMessageService,
        private popupService: PopupService,
        private cloudinaryService: CloudinaryService,
        private vehicleService: VehicleService,
        private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: "bookingId", header: "Booking ID" },
      { field: "fname", header: "Name" },
      { field: "startDate", header: "Start Date" },
      { field: "endDate", header: "End Date" },
      { field: "distance", header: "Distance" },
      { field: "totalAmount", header: "Total" },
    ];

    this.loadInitialData();
    this.records = [
    ];

    
  }

    async loadInitialData() {
          debugger
          try {
            let userId = this.masterDataService.ClientId;
            this.bookingData = [];
            this.driverData = [];
            const [vehicleResult, bookingResult]: any = await firstValueFrom(
              forkJoin([
                this.vehicleService.getAllVehicles(true),
                this.bookingService.GetAllBooking(),
              ])
            );
            debugger
            if (vehicleResult.IsSuccessful) {
              // this.bookingData = vehicleResult.Result;
              vehicleResult.Result.forEach((element) => {
                if(element?.driver?.userId == userId){
                  this.driverData.push(element);
                   
                  console.log("this.driverData", this.driverData);
                  // this.bookingData.push(element);
                  // console.log("this.bookingData", this.bookingData);
                }
              });
              this.vehicleId = this.driverData[0]?.vehicleId;

              if (bookingResult.IsSuccessful) {
                bookingResult.Result.forEach((element: any) => {
                  if (element?.vehicle?.vehicleId === this.vehicleId && element?.status != 3) {
                    this.bookingData.push({
                      ...element,
                      fname: element?.user?.firstName || "N/A",
                      lname: element?.user?.lastName || "N/A",
                      mobile: element?.user?.phoneNumber || "N/A"
                    });
                  }
                });
              
                console.log("Updated bookingData", this.bookingData);
              }
              
            }
      
            if (!vehicleResult.IsSuccessful) {
              this.msgService.showErrorAlert(vehicleResult.Message);
            }
          } catch (error: any) {
            this.msgService.showErrorAlert(error);
          }
        }

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

  onClickStartTrip(e: any) {
    let confirmationConfig = {
      message: "Are you sure you want to start this trip?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.msgService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.bookingService.StartTrip(e?.bookingId).subscribe((response) => {
            debugger
            if (response.IsSuccessful) {
              this.msgService.showSuccessAlert(response.Message);
              this.loadInitialData();
            } else {
              this.msgService.showErrorAlert(response.Message);
            }
        });
      }});
  }

  onClickEndTrip(e: any) {
    let confirmationConfig = {
      message: "Are you sure you want to end this trip?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.msgService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          let request = {
            "bookingId": e?.bookingId,
            "distance": e?.distance,
            "discountRate": e?.discountRate,
          }
          this.bookingService.EndTrip(request).subscribe((response) => {
            debugger
            if (response.IsSuccessful) {
              this.msgService.showSuccessAlert(response.Message);
              this.loadInitialData();
            } else {
              this.msgService.showErrorAlert(response.Message);
            }
        });
      }});
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
