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
    debugger
    this.updateTime();
    let roleId = this.masterDataService.Role;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
    // this.workingDate = this.masterDataService.WorkingDate;

    // this.showWorkingDate = this.datePipe.transform(
    //   this.workingDate,
    //   "y - MMMM"
    // );
    // this.moduleIds = this.masterDataService.MenuList;
    let module = this.router.url.split("/")[1];
    let submodule = this.router.url.split("/")[2];

    this.DynamicItems = [
      {
        menuId: 1,
        label: "Approve Registrations",
        icon: "pi pi-file-edit",
        routerLink: "/approve-registrations",
        isVisible: roleId == 2 ? true : false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminDashboard,
        // ]),
      },
      {
        menuId: 2,
        label: "Trip Management",
        icon: "pi pi-users",
        routerLink: "/driver/driver-accounts",
        isVisible: roleId == 2 || roleId == 3 ? true : false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminUserManagement,
        // ]),
      },
      {
        menuId: 3,
        label: "Vehicle Management",
        icon: "pi pi-car",
        routerLink: "/driver/driver-Information",
        isVisible: roleId == 2 ? true : false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.SuperAdminLeaveManagement,
        //   AppModule.AdminLeaveManagement,
        //   AppModule.DriverLeaveManagement,
        // ]),
        // command: (event: any) => {
        //   this.openTakeout();
        // },
      },
      {
        menuId: 4,
        label: "User accounts",
        icon: "pi pi-id-card",
        routerLink: "/driver/customer-accounts",
        isVisible: roleId == 2 ? true : false,
        // isVisible: this.checkUserAuthorizedToAccess([
        //   AppModule.AdminTripManagement,
        //   AppModule.SuperAdminTripManagement,
        // ]),
      },
      
    ];

    this.items = [
      {
        label: "Change Password",
        icon: "pi pi-file",
      },
    ];
    submodule == 'driver-Information' ? submodule = 'vehicle-management' : submodule;
    submodule == 'customer-accounts' ? submodule = 'user-accounts' : submodule;
    submodule == 'driver-accounts' ? submodule = 'trip-management' : submodule;
    module == 'driver' ? module = submodule : module;
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
