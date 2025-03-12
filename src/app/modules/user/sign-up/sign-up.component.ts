import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  vehicleType:any;
  isdriver = true;
  constructor(
      private router: Router,
      // private formBuilder: FormBuilder,
      // private transactionService: TransactionHandlerService,
      // private masterDataService: MasterDataService,
      private messageService: AppMessageService,
      // private clientIpHandle: ClientIpHandleService,
  
      // private sidebarService: SidebarService,
      // private appComponent: AppComponent,
      // private popupService: PopupService
    ) {
      // this.createForm();
    }

    ngOnInit(): void {
      this.vehicleType = [
        {name: "Car"},
        {name: "Jeep"},
        {name: "Cab"},
      ]
    }

    clickOnRegBtn(type:any){
      type == 1 ? this.isdriver = true : this.isdriver = false;
    }

    clickOnLogin(){
      this.router.navigate(["/login"]);
    }

    clickOnRegister(){
      this.router.navigate(["/login"]);
      this.messageService.showSuccessAlert('Registration Successfully!');
    }
}
