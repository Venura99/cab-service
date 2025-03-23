import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MenuItem } from "primeng/api";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { BookingInvoiceComponent } from "./booking-invoice/booking-invoice.component";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { Router } from "@angular/router";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { CloudinaryService } from "src/app/shared/services/api-services/cloudinary.service";
import { firstValueFrom } from "rxjs";
import { BookingService } from "src/app/shared/services/api-services/booking.service";
import { UpdateBookingFormComponent } from "./update-booking-form/update-booking-form.component";

@Component({
  selector: "app-customer-booking-details",
  templateUrl: "./customer-booking-details.component.html",
  styleUrls: ["./customer-booking-details.component.scss"],
})
export class CustomerBookingDetailsComponent {
  FV = new CommonForm();
  userDetail: any;
  pendingBookingDetails: any[] = [];
  pastBookingDetails: any[] = [];
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  bookingData:any;
  constructor(
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService,
    private router: Router,
    private transactionService: TransactionHandlerService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private popupService: PopupService,
    private cloudinaryService: CloudinaryService,
    private bookingService: BookingService
) {
    this.createForm();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      bankName: ["", [Validators.required]],
      branchName: ["", [Validators.required]],
      accNumber: ["", [Validators.required]],
      accHolderName: ["", [Validators.required]],
      accHolderAddress: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    debugger
    this.items = [
      { id: "1", label: "Pending Bookings", icon: "pi pi-car" },
      { id: "2", label: "Past Bookings", icon: "pi pi-calendar" },
    ];

    this.activeItem = this.items[0];
    this.loadInitialData();

    // this.userDetail = this.addUserControlFlowService.getUserDetail();
    // this.setValues();
  }

  // setValues() {
  //   this.FV.setValue("bankName", this.userDetail?.bankId);
  //   this.FV.setValue("branchName", this.userDetail?.branch);
  //   this.FV.setValue("accNumber", this.userDetail?.accountNumber);
  //   this.FV.setValue("accHolderName", this.userDetail?.accountHolderName);
  //   this.FV.setValue("accHolderAddress", this.userDetail?.accountHolderAddress);
  // }

  async loadInitialData() {
        debugger
        try {
          let userId = this.masterDataService.ClientId;
          const bookingResult:any = await firstValueFrom(
              this.bookingService.GetAllBooking(),
          );
          debugger
          if (bookingResult.IsSuccessful) {
            this.bookingData = bookingResult.Result;
            this.bookingData.forEach((element) => {
              if(element?.user?.userId == userId && element?.status == 1){
                this.pendingBookingDetails.push(element);
                console.log("this.pendingBookingDetails", this.pendingBookingDetails);
              }else if(element?.user?.userId == userId && element?.status == 3){
                this.pastBookingDetails.push(element);
                console.log("this.pastBookingDetails", this.pastBookingDetails);
              }
            });
            console.log("this.bookingData", this.bookingData);
          }
    
          if (!bookingResult.IsSuccessful) {
            this.messageService.showErrorAlert(bookingResult.Message);
          }
        } catch (error: any) {
          this.messageService.showErrorAlert(error);
        }
      }
  

  onClick(item) {
    this.activeItem = item;
  }

  cancelBooking(bookingId) {
    console.log("Cancel Booking: ", bookingId);
  }

  onClickViewInvoice(e: any) {
    try {
      let header = "Booking Invoice";
      let width = "50vw";
      let data = e;
      this.popupService
        .OpenModelPrint(BookingInvoiceComponent, { header, data, width })
        .subscribe((result) => {});
    } catch (error: any) {
      this.messageService.showErrorAlert(error);
    }
  }

  onClickEdit(vehicleData:any){
          this.popupService
          .OpenModel(UpdateBookingFormComponent, {
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
              }
              this.bookingService.UpdateBooking(vehicleData?.bookingId,request).subscribe((response) => {
                debugger
                if (response.IsSuccessful) {
                  this.messageService.showSuccessAlert(response.Message);
                  this.pendingBookingDetails = [];
                  this.pastBookingDetails= [];
                  this.loadInitialData();
                } else {
                  this.messageService.showErrorAlert(response.Message);
                }
              });
            }
            
            console.log(res);
          });
  }

  onClickDelete(data:any){
    let confirmationConfig = {
      message: "Are you sure you want to delete this booking?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.bookingService.DeleteBooking(data?.bookingId).subscribe((response) => {
            debugger
            if (response.IsSuccessful) {
              this.messageService.showSuccessAlert(response.Message);
              this.pendingBookingDetails = [];
              this.pastBookingDetails= [];
              this.loadInitialData();
            } else {
              this.messageService.showErrorAlert(response.Message);
            }
        });
        }
      }
    );
      
  }
}
