import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/shared/services/api-services/cloudinary.service';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { TransactionHandlerService } from 'src/app/shared/services/transaction-handler.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  FV = new CommonForm();
  vehicleType:any;
  isdriver = true;
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
  
      // private sidebarService: SidebarService,
      // private appComponent: AppComponent,
      // private popupService: PopupService
    ) {
      this.createForm();
    }

    ngOnInit(): void {
      this.vehicleType = [
        {name: "Car"},
        {name: "Jeep"},
        {name: "Cab"},
        {name: "Other"},
      ]
    }


     createForm() {
        this.FV.formGroup = this.formBuilder.group({
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          phoneNumber: ["", Validators.required],
          nicNumber: ["", ],
          dateOfBirth: ["", ],
          address: ["", ],
          profileImage: [null],
          password: ["", Validators.required],
          confirmPassword: ["", Validators.required],
          userEmail: ["", ],

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


    clickOnRegBtn(type:any){
      type == 1 ? this.isdriver = true : this.isdriver = false;
    }

    clickOnLogin(){
      this.router.navigate(["/login"]);
    }

    
    onFileSelected(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        this.cloudinaryService.uploadImage(file).subscribe(response => {
          this.profileImageUrl = response.secure_url;
          this.FV.formGroup.patchValue({ profileImage: this.profileImageUrl });
          console.log('Uploaded Image URL:', this.profileImageUrl);
        });
      }
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

    clickOnRegister(){
      debugger
      let firstName = this.FV.getValue("firstName");
      let lastName = this.FV.getValue("lastName");
      let phoneNumber = this.FV.getValue("phoneNumber");
      let nicNumber = this.FV.getValue("nicNumber");
      let dateOfBirth = this.FV.getValue("dateOfBirth");
      let address = this.FV.getValue("address");
      let profileImage = this.FV.getValue("profileImage");
      let password = this.FV.getValue("password");
      let confirmPassword = this.FV.getValue("confirmPassword");
      let userEmail = this.FV.getValue("userEmail");
      let vehicleType = this.FV.getValue("vehicleType");
      let registrationNo = this.FV.getValue("registrationNo");
      let passengerCount = this.FV.getValue("passengerCount");
      let chargePerKm = this.FV.getValue("chargePerKm");
      let vehicleImage1 = this.FV.getValue("vehicleImage1");
      let vehiceldescription = this.FV.getValue("vehiceldescription");
      let isTaxIncluded = this.FV.getValue("isTaxIncluded");
      let isVatIncluded = this.FV.getValue("isVatIncluded");
      let isServiceChargeIncluded = this.FV.getValue("isServiceChargeIncluded");
      let request: any;

      if(password != confirmPassword){
        this.messageService.showErrorAlert('Password and Confirm Password does not match!');
        return;
      }
      
      // return;
      if(this.isdriver){
        request = {
          "firstName": firstName,
          "lastName": lastName,
          "userName": firstName,
          "phoneNumber": phoneNumber,
          "nicNumber": nicNumber,
          "dateOfBirth": dateOfBirth,
          "address": address,
          "nicImage": "nicprofileImage",
          "profileImage": this.profileImageUrl,
          "password": password,
          "role": 3,
          "userEmail": userEmail,
          "vehicleRequest": { 
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
        }
      }else{
        request = {
          "firstName": firstName,
          "lastName": lastName,
          "userName": firstName,
          "phoneNumber": phoneNumber,
          "nicNumber": nicNumber,
          "dateOfBirth": dateOfBirth,
          "address": address,
          "nicImage": "nicprofileImage",
          "profileImage": this.profileImageUrl,
          "password": password,
          "role": 1,
          "userEmail": userEmail,
          "vehicleRequest": null
        }
      }

      this.transactionService.userRegister(request).subscribe((response) => {
        debugger
        if (response.IsSuccessful) {
          this.messageService.showSuccessAlert(response.Message);
          this.router.navigate(["/login"]);
        } else {
          this.messageService.showErrorAlert(response.Message);
        }
      });
      // this.router.navigate(["/login"]);
      // this.messageService.showSuccessAlert('Registration Successfully!');
    }
}
