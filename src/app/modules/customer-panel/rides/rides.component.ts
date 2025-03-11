import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { CabDetailsPageComponent } from './cab-details-page/cab-details-page.component';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent {
FV = new CommonForm();
veheiclesArry:any;
constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // private transactionService: TransactionHandlerService,
    // private masterDataService: MasterDataService,
    // private messageService: AppMessageService,
    // private clientIpHandle: ClientIpHandleService,

    // private sidebarService: SidebarService,
    // private appComponent: AppComponent,
    private popupService: PopupService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.veheiclesArry = [
      {
        img: 'vehicles/01.jpg',
        vehicle: 'MG MG4 X Icon Long Range 2024',
        price: '7550.00 LKR per 400km',
        driver: 'Saman Kumara',
        guest: 5,
        phone: '0777636984'
      },
      {
        img: 'vehicles/02.jpg',
        vehicle: 'Suzuki Celerio VXI Auto 2014',
        price: '4500.00 LKR per 400km',
        driver: 'Palitha Munasinghe',
        guest: 4,
        phone: '0785647812'
      },
      {
        img: 'vehicles/03.jpg',
        vehicle: 'Micro Panda 2015',
        price: '5000.00 LKR per 400km',
        driver: 'Kasun Gunasekara',
        guest: 5,
        phone: '07745682342'
      },
      {
        img: 'vehicles/01.jpg',
        vehicle: 'MG MG4 X Icon Long Range 2024',
        price: '7550.00 LKR per 400km',
        driver: 'Saman Kumara',
        guest: 6,
        phone: '07615987562'
      },
      {
        img: 'vehicles/01.jpg',
        vehicle: 'MG MG4 X Icon Long Range 2024',
        price: '7550.00 LKR per 400km',
        driver: 'Saman Kumara',
        guest: 5,
        phone: '0777636984'
      },
      {
        img: 'vehicles/01.jpg',
        vehicle: 'MG MG4 X Icon Long Range 2024',
        price: '7550.00 LKR per 400km',
        driver: 'Saman Kumara',
        guest: 5,
        phone: '0777636984'
      },
      {
        img: 'vehicles/01.jpg',
        vehicle: 'MG MG4 X Icon Long Range 2024',
        price: '7550.00 LKR per 400km',
        driver: 'Saman Kumara',
        guest: 5,
        phone: '0777636984'
      },
    ]
  }

  createForm() {
      this.FV.formGroup = this.formBuilder.group({
        username: ["", Validators.required],
        // password: ["", Validators.required],
      });
  }

   openSelectedCab(vehicleData:any){
        this.popupService
        .OpenModel(CabDetailsPageComponent, {
          header: "",
          width: "90vw",
          data: vehicleData
        })
        .subscribe((res) => {});
      }

}
