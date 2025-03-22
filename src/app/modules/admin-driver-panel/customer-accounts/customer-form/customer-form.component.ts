import { Component } from '@angular/core';
import { MessageService } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { VehicleService } from 'src/app/shared/services/api-services/vehicle.service';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CloudinaryService } from 'src/app/shared/services/api-services/cloudinary.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  FV = new CommonForm();
  selectedData:any;
  selectedImage:any;
  profileImageUrl: string = '';

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
            if(this.selectedData?.userId){
              this.loadUserDetails(this.selectedData);
          }
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
                
              });
            }

            loadUserDetails(data:any){
              this.FV.setValue("firstName", data.firstName);
              this.FV.setValue("lastName", data.lastName);
              this.FV.setValue("phoneNumber", data.phoneNumber);
              this.FV.setValue("nicNumber", data.nicNumber);
              this.FV.setValue("dateOfBirth", data.dateOfBirth);
              this.FV.setValue("address", data.address);
              this.FV.setValue("profileImage", data.profileImage);
              this.FV.setValue("password", data.password);
              this.FV.setValue("confirmPassword", data.confirm);
              this.FV.setValue("userEmail", data.userEmail);
              this.profileImageUrl = data.profileImage;
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
}
