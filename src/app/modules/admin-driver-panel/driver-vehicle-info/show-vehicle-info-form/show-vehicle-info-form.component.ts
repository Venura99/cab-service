import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloudinaryService } from 'src/app/shared/services/api-services/cloudinary.service';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { TransactionHandlerService } from 'src/app/shared/services/transaction-handler.service';

@Component({
  selector: 'app-show-vehicle-info-form',
  templateUrl: './show-vehicle-info-form.component.html',
  styleUrls: ['./show-vehicle-info-form.component.scss']
})
export class ShowVehicleInfoFormComponent {
  FV = new CommonForm();
  selectedData:any;
  vehicleType:any;
  selectedImage:any;
  profileImageUrl: string = '';
  vehicleImageUrl: string = '';
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private transactionService: TransactionHandlerService,
      private masterDataService: MasterDataService,
      private messageService: AppMessageService,
      private cloudinaryService: CloudinaryService,
      public ref: DynamicDialogRef,
       private config: DynamicDialogConfig,
      // private sidebarService: SidebarService,
      // private appComponent: AppComponent,
      // private popupService: PopupService
    ) {
      this.createForm();
    }

    ngOnInit(): void {
      this.selectedData = this.config.data;
      debugger
      if(this.selectedData?.vehicleId){
        this.loadVehicleDetails(this.selectedData);
    }
    }

     createForm() {
        this.FV.formGroup = this.formBuilder.group({
          vehicleType: ["", Validators.required],
          registrationNo: ["", Validators.required],
          passengerCount: ["", ],
          chargePerKm: ["", ],
          vehicleImage1: [null],
          vehiceldescription: ["", ],
          isTaxIncluded: [false,],
          isVatIncluded: [false, ],
          isServiceChargeIncluded: [false,],
          
        });
      }

      loadVehicleDetails(data:any){
        this.FV.setValue("vehicleType", data.vehicleType);
        this.FV.setValue("registrationNo", data.registrationNo);
        this.FV.setValue("passengerCount", data.passengerCount);
        this.FV.setValue("chargePerKm", data.chargePerKm);
        this.FV.setValue("vehicleImage1", data.vehicleImage1);
        this.FV.setValue("vehiceldescription", data.vehiceldescription);
        this.FV.setValue("isTaxIncluded", data.isTaxIncluded);
        this.FV.setValue("isVatIncluded", data.isVatIncluded);
        this.FV.setValue("isServiceChargeIncluded", data.isServiceChargeIncluded);
        this.vehicleImageUrl = data.vehicleImage1;
      }

      onFileSelectedforVehicle(event: any) {
        const file = event.target.files[0];
    
        if (file) {
          this.cloudinaryService.uploadImage(file).subscribe(response => {
            this.vehicleImageUrl = response.secure_url;
            this.FV.formGroup.patchValue({ vehicleImage1: this.vehicleImageUrl });
            console.log('Uploaded Image URL:', this.vehicleImageUrl);
          });
        }
      }

    clickOnUpdate(){
      let vehicleType = this.FV.getValue("vehicleType");
      let registrationNo = this.FV.getValue("registrationNo");
      let passengerCount = this.FV.getValue("passengerCount");
      let chargePerKm = this.FV.getValue("chargePerKm");
      let vehicleImage1 = this.FV.getValue("vehicleImage1");
      let vehiceldescription = this.FV.getValue("vehiceldescription");
      let isTaxIncluded = this.FV.getValue("isTaxIncluded");
      let isVatIncluded = this.FV.getValue("isVatIncluded");
      let isServiceChargeIncluded = this.FV.getValue("isServiceChargeIncluded");

      if(this.FV.validateControllers("vehicleType,registrationNo")){
        this.messageService.showErrorAlert('Please fill all the required fields!');
        return;
      } 
      let request:any =  { 
          "vehicleType": vehicleType,
          "registrationNo": registrationNo,
          "passengerCount": passengerCount,
          "chargePerKm": chargePerKm,
          "vehicleImage1": this.vehicleImageUrl,
          "vehicleImage2": vehiceldescription,
          "vehiceldescription": vehiceldescription,
          "isTaxIncluded": isTaxIncluded,
          "isVatIncluded": isVatIncluded,
          "isServiceChargeIncluded": isServiceChargeIncluded,
          "tax": isTaxIncluded ? 10.00 : 0.0,
          "vat": isVatIncluded ? 5.00 : 0.0,
          "serviceCharge": isServiceChargeIncluded ? 5.00 : 0.0,
        }

        this.ref.close(request);
      }
}