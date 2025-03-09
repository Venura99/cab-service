import { firstValueFrom, Subscription } from "rxjs";
import { NotificationService } from "./../../shared/services/api-services/notification.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { AppModule } from "src/app/shared/enums/app-module.enum";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { DatePipe } from "@angular/common";
import { PopupService } from "src/app/shared/services/popup.service";
import { ChangePasswordComponent } from "src/app/modules/user/change-password/change-password.component";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import {
  addNotification,
  initiallySetState,
  removeNotification,
} from "src/app/store/action/notification.action";
import { selectNotificationCount } from "src/app/store/selector/notification.selector";
import { ExpenseExtensionService } from "src/app/shared/services/api-services/expense-extension.service";

@Component({
  selector: "app-default-layout-new",
  templateUrl: "./default-layout-new.component.html",
  styleUrls: ["./default-layout-new.component.scss"],
})
export class DefaultLayoutNewComponent {
  DynamicItems: any[] = [];
  activeTab: number = -1;
  moduleIds: number[] = [];
  workingDate: string = "";
  showWorkingDate: string = "";
  items: any[];
  notificationCount: number = 0;
  currentTime: string = '';
  private intervalId: any;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private datePipe: DatePipe,
    private popupService: PopupService,
    private notificationService: NotificationService,
    private store: Store<AppState>, // private webSocketService: WebSocketService
    private expenseRequestService: ExpenseExtensionService
  ) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
    this.workingDate = this.masterDataService.WorkingDate;

    this.showWorkingDate = this.datePipe.transform(
      this.workingDate,
      "y - MMMM"
    );
    // this.moduleIds = this.masterDataService.MenuList;
    let module = this.router.url.split("/")[1];
    let submodule = this.router.url.split("/")[2];

    this.DynamicItems = [
      {
        menuId: 1,
        label: "Dashboard",
        icon: "pi pi-chart-bar",
        routerLink: "/dashboard",
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminDashboard,
        // ]),
      },
      {
        menuId: 2,
        label: "Dining",
        icon: "pi pi-shop",
        routerLink: "/dining",
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminUserManagement,
        // ]),
      },
      {
        menuId: 3,
        label: "TakeOut",
        icon: "pi pi-shopping-bag",
        // routerLink: '/order-panel/' + 'take-out' + '/' + '0',
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminLeaveManagement,
        //   AppModule.AdminLeaveManagement,
        //   AppModule.DriverLeaveManagement,
        // ]),
        command: (event: any) => {
          this.openTakeout();
        },
      },
      {
        menuId: 4,
        label: "Delivery",
        icon: "pi pi-truck",
        // routerLink: "/trip-management",
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.AdminTripManagement,
        //   AppModule.SuperAdminTripManagement,
        // ]),
      },
      {
        menuId: 5,
        label: "Tab",
        icon: "pi pi-discord",
        // routerLink: '/order-panel/' + 'tab' + '/' + '0',
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminVehicleManagement,
        //   AppModule.AdminVehicleManagement,
        // ]),
        command: (event: any) => {
          this.openTab();
        },
      },
      {
        menuId: 6,
        label: "Your Trips",
        icon: "pi pi-map",
        // routerLink: "/trip-management",
        isVisible: false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.DriverTripManagement,
        // ]),
      },
      {
        menuId: 7,
        label: "Month Audit",
        icon: "pi pi-briefcase",
        isVisible: false,
        // routerLink: "/month-audit",
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminMonthAudit,
        // ]),
        command: (event: any) => {
          this.openMonthAudit();
        },
      },
      {
        menuId: 8,
        label: "Vehicle Tracking",
        icon: "pi pi-map-marker",
        // routerLink: "/vehicle-tracking",
        isVisible: false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminVehicleTracking,
        // ]),
      },
      {
        menuId: 9,
        label: "Reports",
        icon: "pi pi-file",
        // routerLink: "/reports",
        isVisible: true,
        command: (event: any) => {
          this.openReports();
        },
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.AdminReportManagement,
        //   AppModule.SuperAdminReportManagement,
        // ]),
      },
      {
        menuId: 10,
        label: "Order History",
        icon: "pi pi-clock",
        // routerLink: "/reports",
        isVisible: true,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.AdminReportManagement,
        //   AppModule.SuperAdminReportManagement,
        // ]),
      },
    ];

    this.items = [
      {
        label: "Change Password",
        icon: "pi pi-file",
      },
    ];
    module == 'order-panel' ? module = submodule : module;
    this.ModuleActivate(module);

    // ngrx store
    let isLoaded = this.notificationService.getNotificationLoaded();
    if (!isLoaded) {
      this.getAllNotifications();
    }
    this.store.select(selectNotificationCount).subscribe((count) => {
      this.notificationCount = count;
    });

    // this.subscriptions.push(
    //   this.expenseRequestService.onNewExpenseRequest().subscribe({
    //     next: (expense: any) => {
    //       this.messageService.showNotificationAlert(expense?.message);
    //       this.store.dispatch(addNotification({ notification: expense.data }));
    //     },

    //     error: (error) => {
    //       console.error("Socket error:", error);
    //     },
    //   })
    // );

    // this.subscriptions.push(
    //   this.expenseRequestService.onApproveExpenseRequest().subscribe({
    //     next: (expense: any) => {
    //       this.store.dispatch(
    //         removeNotification({ notification: expense.data })
    //       );
    //     },
    //     error: (error) => {
    //       console.error("Socket error:", error);
    //     },
    //   })
    // );

    // this.subscriptions.push(
    //   this.expenseRequestService.onRejectExpenseRequest().subscribe({
    //     next: (expense: any) => {
    //       this.store.dispatch(
    //         removeNotification({ notification: expense.data })
    //       );
    //     },
    //     error: (error) => {
    //       console.error("Socket error:", error);
    //     },
    //   })
    // );
  }

  openTab(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/order-panel/' + 'tab' + '/' + '0']);
    });
  }

  openTakeout(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/order-panel/' + 'takeout' + '/' + '0']);
    });
  }

  openReports(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/reports']);
    });
  }

  ModuleActivate(routeModule: any) {
    debugger
    this.DynamicItems.forEach((element: any) => {
      if (element.label.toLowerCase().replace(/\s+/g, "-") == routeModule) {
        this.activeTab = element.menuId;
      }
    });
  }


  checkUserAuthorizedToAccess(moduleIds: number[]): boolean {
    let flag: boolean = false;

    moduleIds.forEach((element) => {
      if (this.moduleIds.includes(element)) {
        flag = true;
      }
    });
    return flag;
  }

  onClickLogout() {
    let confirmationConfig = {
      message: "Are you sure you want to cancel this leave?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }

  onClickSettings() {
    this.popupService
      .OpenModel(ChangePasswordComponent, {
        header: "CHANGE PASSWORD",
        width: "30vw",
      })
      .subscribe((res) => {});
  }

  openMonthAudit() {
    let systemMonth = this.masterDataService.WorkingMonth;
    let systemYear = this.masterDataService.WorkingYear;

    let today = new Date();

    let lastDayOfSystemDate = new Date(systemYear, systemMonth, 0).getDate();
    let systemDate = new Date(systemYear, systemMonth - 1, lastDayOfSystemDate);

    if (today >= systemDate) {
      this.router.navigate(["/month-audit"]);
    } else {
      this.messageService.showInfoAlert(
        `Month Audit is closed. You can do monthly audit for this month on or after the last day of this month (${systemYear}-${systemMonth}-${lastDayOfSystemDate})!`
      );
    }
  }

  moveToRouter(routerLink: string) {
    this.router.navigate([routerLink]);
  }

  // Handle Notification
  async getAllNotifications() {
    this.store.dispatch(initiallySetState({ notifications: [] }));

    const notificationResult = await firstValueFrom(
      this.notificationService.GetAllNotifications()
    );

    if (notificationResult.IsSuccessful) {
      this.notificationService.setNotificationLoaded();
      this.store.dispatch(
        initiallySetState({ notifications: notificationResult.Result || [] })
      );
    }
  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    if (this.intervalId) {
      clearInterval(this.intervalId); // Prevent memory leaks
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: false }); 
  }
}
