import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { CabDetailsPageComponent } from './cab-details-page/cab-details-page.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TransactionHandlerService } from 'src/app/shared/services/transaction-handler.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { CloudinaryService } from 'src/app/shared/services/api-services/cloudinary.service';
import { firstValueFrom } from 'rxjs';
import { VehicleService } from 'src/app/shared/services/api-services/vehicle.service';
import { BookingService } from 'src/app/shared/services/api-services/booking.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent {
FV = new CommonForm();
veheiclesArry:any;
constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionHandlerService,
    private vehicleService: VehicleService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private cloudinaryService: CloudinaryService,
    private bookingService: BookingService,

    // private sidebarService: SidebarService,
    // private appComponent: AppComponent,
    private popupService: PopupService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  createForm() {
      this.FV.formGroup = this.formBuilder.group({
        username: ["", Validators.required],
        // password: ["", Validators.required],
      });
  }

    async loadInitialData() {
        debugger
        try {
          const vehicleResult:any = await firstValueFrom(
              this.vehicleService.getAllVehicles(false),
          );
          debugger
          if (vehicleResult.IsSuccessful) {
            this.veheiclesArry = vehicleResult.Result;
            console.log("this.veheiclesArry", this.veheiclesArry);
          }
    
          if (!vehicleResult.IsSuccessful) {
            this.messageService.showErrorAlert(vehicleResult.Message);
          }
        } catch (error: any) {
          this.messageService.showErrorAlert(error);
        }
      }

   openSelectedCab(vehicleData:any){
        this.popupService
        .OpenModel(CabDetailsPageComponent, {
          header: "",
          width: "90vw",
          data: vehicleData
        })
        .subscribe((res) => {
          debugger
          if(res){
            let request = {
              "startDate": res?.startDate,
              "endDate": res?.endDate,
              "description": res?.description,
              "distance": res?.distance,
              "vehicleId": vehicleData?.vehicleId
            }
            this.bookingService.saveBooking(request).subscribe((response) => {
              debugger
              if (response.IsSuccessful) {
                this.messageService.showSuccessAlert(response.Message);
                this.loadInitialData();
              } else {
                this.messageService.showErrorAlert(response.Message);
              }
            });
          }
          
          console.log(res);
        });
      }

}
