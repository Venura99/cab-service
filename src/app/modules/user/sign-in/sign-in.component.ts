import { PopupService } from "./../../../shared/services/popup.service";
import { AppComponent } from "./../../../app.component";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { ClientIpHandleService } from "src/app/shared/services/client-ip-handle.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent {
  FV = new CommonForm();
  systemInformation: any;
  passwordType: string = "password";
  users: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionHandlerService,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,
    private clientIpHandle: ClientIpHandleService,

    private sidebarService: SidebarService,
    private appComponent: AppComponent,
    private popupService: PopupService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.users = [
      {
        rolId: 1,
        rolName: "Admin",
        username: "admin",
        password: "1",
      },
      {
        rolId: 1,
        rolName: "Admin",
        username: "Nimna",
        password: "2",
      },
      {
        rolId: 2,
        rolName: "Customer",
        username: "Lahiru",
        password: "3",
      },
      {
        rolId: 2,
        rolName: "Customer",
        username: "Venura",
        password: "4",
      },
      {
        rolId: 3,
        rolName: "Driver",
        username: "Driver 01",
        password: "4",
      },
    ];

    this.sidebarService.closeSidebar();
    this.appComponent.sidebarVisible = false;
    this.popupService.closeOpenDialogs();
    this.masterDataService.clearLoginData();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  handleSubmit() {
    if (this.FV.formGroup.invalid) {
      this.FV.showErrors();
      return;
    }
  }

  onLogin() {
    if (this.FV.formGroup.invalid) {
      this.FV.showErrors();
      return;
    }

    

    // let rolId = this.FV.getValue("username")?.rolId;
    let userName = this.FV.getValue("username").toLowerCase();;
    let password = this.FV.getValue("password");

    debugger
    // let correctUser:any = this.users.filter((item:any)=> item.username.toLowerCase() == userName);

    // if(!(correctUser.length > 0)){
    //   this.messageService.showErrorAlert('Invalid username or password!')
    //   return;
    // }
    let request = {
      userName: userName,
      password: password,
    };

    this.transactionService.userLogin(request).subscribe((response) => {
      debugger
      if (response.IsSuccessful) {
        this.messageService.showSuccessAlert(response.Message);
        this.masterDataService.setUserData(response.Result);
        let rolId: any = response.Result?.user?.role;
        //role 1 = user, role 2 = admin, role 3 = driver
        if(rolId == 1){
          this.router.navigate(["/customer-panel"]);
        }else if(rolId == 2){
          this.router.navigate(["/approve-registrations"]);
        }else if(rolId == 3){
          this.router.navigate(["/driver/driver-accounts"]);
        }else{
          this.router.navigate(["/customer-panel"]);
        }
      } else {
        this.messageService.showErrorAlert(response.Message);
      }
    });
  }

  clickOnSignUp(){
    this.router.navigate(["/sign-up"]);
  }
}
