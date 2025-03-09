import { Component } from '@angular/core';
import { ShowVehicleInfoFormComponent } from './show-vehicle-info-form/show-vehicle-info-form.component';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-driver-vehicle-info',
  templateUrl: './driver-vehicle-info.component.html',
  styleUrls: ['./driver-vehicle-info.component.scss']
})
export class DriverVehicleInfoComponent {
  drivers: any[];

  first = 0;

  rows = 10;

  constructor(private popupService: PopupService,) {}

  ngOnInit(): void {
    this.drivers = [
      { name: 'John Doe', mobile: '123-456-7890', address: '123 Main St', type: 'car', vehicleNo: 'ABC-1234' },
      { name: 'Jane Smith', mobile: '987-654-3210', address: '456 Elm St', type: 'van', vehicleNo: 'XYZ-5678' },
      { name: 'Alice Johnson', mobile: '555-678-1234', address: '789 Oak St', type: 'truck', vehicleNo: 'LMN-3456' },
      { name: 'Bob Williams', mobile: '444-567-8901', address: '321 Pine St', type: 'car', vehicleNo: 'OPQ-6789' },
      { name: 'Charlie Brown', mobile: '333-456-7890', address: '987 Maple St', type: 'motorcycle', vehicleNo: 'RST-1234' },
      { name: 'David Miller', mobile: '222-345-6789', address: '654 Cedar St', type: 'bus', vehicleNo: 'UVW-5678' },
      { name: 'Ella Davis', mobile: '111-234-5678', address: '741 Birch St', type: 'van', vehicleNo: 'XYZ-8901' },
      { name: 'Frank Moore', mobile: '999-123-4567', address: '852 Spruce St', type: 'truck', vehicleNo: 'ABC-2345' },
      { name: 'Grace Taylor', mobile: '888-987-6543', address: '963 Chestnut St', type: 'car', vehicleNo: 'DEF-6789' },
      { name: 'Henry Anderson', mobile: '777-876-5432', address: '159 Redwood St', type: 'bus', vehicleNo: 'GHI-3456' },
      { name: 'Ivy Thomas', mobile: '666-765-4321', address: '357 Palm St', type: 'motorcycle', vehicleNo: 'JKL-7890' },
      { name: 'Jack Harris', mobile: '555-654-3210', address: '258 Magnolia St', type: 'van', vehicleNo: 'MNO-4567' }
    ];
    
        
   }

   clickOnViewDetails(rowData:any){
      this.popupService
      .OpenModel(ShowVehicleInfoFormComponent, {
        header: "Driver Details",
        width: "40vw",
        data: rowData
      })
      .subscribe((res) => {});
   }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.drivers ? this.first + this.rows >= this.drivers.length : true;
    }

    isFirstPage(): boolean {
        return this.drivers ? this.first === 0 : true;
    }
}
