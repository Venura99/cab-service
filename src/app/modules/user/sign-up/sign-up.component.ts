import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(
      private router: Router,
      // private formBuilder: FormBuilder,
      // private transactionService: TransactionHandlerService,
      // private masterDataService: MasterDataService,
      // private messageService: AppMessageService,
      // private clientIpHandle: ClientIpHandleService,
  
      // private sidebarService: SidebarService,
      // private appComponent: AppComponent,
      // private popupService: PopupService
    ) {
      // this.createForm();
    }

    ngOnInit(): void {

    }

    clickOnLogin(){
      this.router.navigate(["/login"]);
    }
}
