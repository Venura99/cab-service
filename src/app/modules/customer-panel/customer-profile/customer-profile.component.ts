import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { CustomerBookingDetailsComponent } from "./customer-booking-details/customer-booking-details.component";

@Component({
  selector: "app-customer-profile",
  templateUrl: "./customer-profile.component.html",
  styleUrls: ["./customer-profile.component.scss"],
})
export class CustomerProfileComponent {
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private route: ActivatedRoute,
    private messageSrvice: AppMessageService
  ) {}

  nOnInit(): void {}

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
      this.messageSrvice.showErrorAlert(error);
    }
  }
}
