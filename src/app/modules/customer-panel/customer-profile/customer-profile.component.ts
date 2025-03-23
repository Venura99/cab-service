import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { CustomerBookingDetailsComponent } from "./customer-booking-details/customer-booking-details.component";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { CloudinaryService } from "src/app/shared/services/api-services/cloudinary.service";
import { firstValueFrom, forkJoin } from "rxjs";
import { PopupService } from "src/app/shared/services/popup.service";
import { CustomerEditDetailsComponent } from "./customer-edit-details/customer-edit-details.component";
import { BookingService } from "src/app/shared/services/api-services/booking.service";

@Component({
  selector: "app-customer-profile",
  templateUrl: "./customer-profile.component.html",
  styleUrls: ["./customer-profile.component.scss"],
})
export class CustomerProfileComponent {
  userData:any = [];
  userName: any;
  profileImage: any;
  pendingBookingDetails: any[] = [];
  pastBookingDetails: any[] = [];
  bookingData:any;
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private transactionService: TransactionHandlerService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private popupService: PopupService,
    private cloudinaryService: CloudinaryService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  onClickBookingDetails() {
    try {
      console.log("Booking Details");
      let data = {
        userData: null,
        isEdit: false,
      };

      // this.addUserControlFlowService.resetData();

      let properties = {
        width: "50vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "Booking Details",
        CustomerBookingDetailsComponent,
        properties,
        data
      );
    } catch (error: any) {
      console.log(error);
      this.messageService.showErrorAlert(error);
    }
  }

  async loadInitialData() {
      debugger
      try {
        let userId = this.masterDataService.ClientId;

        const [userResult, bookingResult]: any = await firstValueFrom(
          forkJoin([
            this.transactionService.getUserById(userId),
            this.bookingService.GetAllBooking(),
          ])
        );

        // const userResult:any = await firstValueFrom(
        //     this.transactionService.getUserById(userId),
        // );
        debugger
        if (userResult.IsSuccessful) {
          this.userData = userResult.Result;
          this.profileImage = userResult.Result?.profileImage;
          this.userName = userResult.Result?.firstName;
          console.log("this.userData", this.userData);
        }
  
        if (!userResult.IsSuccessful) {
          this.messageService.showErrorAlert(userResult.Message);
        }

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
      } catch (error: any) {
        this.messageService.showErrorAlert(error);
      }
    }


    clickOnEditDetails(){
            this.popupService
            .OpenModel(CustomerEditDetailsComponent, {
              header: "Customer Details",
              width: "40vw",
              data: this.userData
            })
            .subscribe((res) => {
              if(res){
                debugger
                this.transactionService.updateUserProfile(res).subscribe((response) => {
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
}
