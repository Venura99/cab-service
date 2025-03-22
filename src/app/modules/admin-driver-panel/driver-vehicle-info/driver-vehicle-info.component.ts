import { Component } from '@angular/core';
import { ShowVehicleInfoFormComponent } from './show-vehicle-info-form/show-vehicle-info-form.component';
import { MessageService } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { VehicleService } from 'src/app/shared/services/api-services/vehicle.service';

@Component({
  selector: 'app-driver-vehicle-info',
  templateUrl: './driver-vehicle-info.component.html',
  styleUrls: ['./driver-vehicle-info.component.scss']
})
export class DriverVehicleInfoComponent {
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
      { field: "vehicleImage1", header: "Vehicle Image" },
      { field: "vehicleType", header: "Vehicle Type" },
      { field: "registrationNo", header: "Registration No" },
      { field: "chargePerKm", header: "Charge per Km" },
      { field: "passengerCount", header: "Passenger Count" },
    ];
    this.loadInitialData();
        
   }

   async loadInitialData() {
    debugger
    try {

      const vehicleResult:any = await firstValueFrom(
          this.vehicleService.getAllVehicles(true),
      );
      debugger
      if (vehicleResult.IsSuccessful) {
        this.records = vehicleResult.Result;
      }

      if (!vehicleResult.IsSuccessful) {
        this.messageService.showErrorAlert(vehicleResult.Message);
      }
    } catch (error: any) {
      this.messageService.showErrorAlert(error);
    }
  }

  clickOnEditVehicle(rowData:any){
      this.popupService
      .OpenModel(ShowVehicleInfoFormComponent, {
        header: "Driver Details",
        width: "40vw",
        data: rowData
      })
      .subscribe((res) => {
        if(res){
          debugger
          this.vehicleService.updateVehicleById(rowData?.vehicleId,res).subscribe((response) => {
            debugger
            if (response.IsSuccessful) {
              this.messageService.showSuccessAlert(response.Message);
              this.loadInitialData();
            } else {
              this.messageService.showErrorAlert(response.Message);
            }
          });
          
        }

      });
   }

   clickOnDeleteVehicle(rowData:any){
    let confirmationConfig = {
      message: "Are you sure you want to delete this vehicle?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.vehicleService.deleteVehicleById(rowData?.vehicleId).subscribe((response) => {
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
