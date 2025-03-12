import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MenuItem } from "primeng/api";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { BookingInvoiceComponent } from "./booking-invoice/booking-invoice.component";

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

  constructor(
    private formBuilder: FormBuilder,
    private popup: PopupService,
    private msgService: AppMessageService
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
    this.items = [
      { id: "1", label: "Pending Bookings", icon: "pi pi-car" },
      { id: "2", label: "Past Bookings", icon: "pi pi-calendar" },
    ];

    this.activeItem = this.items[0];

    this.pendingBookingDetails = [
      {
        bookingId: "BK-1001",
        customerName: "John Doe",
        carModel: "Toyota Corolla 2022",
        vehicleNumber: "AB-1234",
        img: "vehicles/01.jpg",
        pickupDate: "2025-03-15",
        returnDate: "2025-03-18",
        pickupTime: "10:00 AM",
        pickupLocation: "Colombo City Center",
        dropoffLocation: "Negombo Town Hall",
        bookingStatus: "Pending Confirmation",
        paymentStatus: "Pending",
        totalAmount: "LKR 35,000",
        driverAssigned: false,
        bookingType: "Self Drive",
      },
      {
        bookingId: "BK-1002",
        customerName: "Jane Smith",
        carModel: "Honda Civic 2023",
        vehicleNumber: "CB-5678",
        img: "vehicles/02.jpg",
        pickupDate: "2025-03-20",
        returnDate: "2025-03-25",
        pickupTime: "9:30 AM",
        pickupLocation: "Kandy Railway Station",
        dropoffLocation: "Kandy Railway Station",
        bookingStatus: "Confirmed",
        paymentStatus: "Partially Paid",
        totalAmount: "LKR 50,000",
        driverAssigned: true,
        driverName: "Ruwan Perera",
        driverContact: "+94 77 123 4567",
        bookingType: "With Driver",
      },
    ];

    this.pastBookingDetails = [
      {
        bookingId: "PBK-1001",
        customerName: "Jane Cooper",
        carModel: "Toyota Corolla",
        img: "vehicles/01.jpg",
        pickupDate: "2025-01-10",
        pickupTime: "10:00 AM",
        returnDate: "2025-01-12",
        pickupLocation: "Colombo",
        dropoffLocation: "Kandy",
        bookingStatus: "Completed",
        paymentStatus: "Paid",
        totalAmount: "Rs. 20,000",
        bookingType: "With Driver",
        driverAssigned: true,
        driverName: "Samantha Perera",
        driverContact: "077-1234567",
      },
      {
        bookingId: "PBK-1002",
        customerName: "Michael Fernando",
        carModel: "Honda Civic",
        img: "vehicles/02.jpg",
        pickupDate: "2025-01-05",
        pickupTime: "2:00 PM",
        returnDate: "2025-01-07",
        pickupLocation: "Galle",
        dropoffLocation: "Negombo",
        bookingStatus: "Completed",
        paymentStatus: "Paid",
        totalAmount: "Rs. 18,500",
        bookingType: "Self Drive",
        driverAssigned: false,
      },
      {
        bookingId: "PBK-1003",
        customerName: "Nimali Senanayake",
        carModel: "Nissan X-Trail",
        img: "vehicles/03.jpg",
        pickupDate: "2024-12-25",
        pickupTime: "9:00 AM",
        returnDate: "2024-12-28",
        pickupLocation: "Kurunegala",
        dropoffLocation: "Matara",
        bookingStatus: "Completed",
        paymentStatus: "Paid",
        totalAmount: "Rs. 24,000",
        bookingType: "With Driver",
        driverAssigned: true,
        driverName: "Ajith Kumara",
        driverContact: "076-9988776",
      },
    ];

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
      this.popup
        .OpenModelPrint(BookingInvoiceComponent, { header, data, width })
        .subscribe((result) => {});
    } catch (error: any) {
      this.msgService.showErrorAlert(error);
    }
  }
}
