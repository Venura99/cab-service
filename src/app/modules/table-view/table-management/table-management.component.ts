import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { AppModule } from "src/app/shared/enums/app-module.enum";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { DatePipe } from "@angular/common";
import { PopupService } from "src/app/shared/services/popup.service";
import { CreateReservationFormComponent } from './create-reservation-form/create-reservation-form.component';
@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent {
  floors: any;
  tables:any;
  selectedFloor = -1;
  reservationId = -1;
  orderType = 'dining'
  constructor(
      private router: Router,
      private sidebarService: SidebarService,
      private masterDataService: MasterDataService,
      private messageService: AppMessageService,
      private datePipe: DatePipe,
      private popupService: PopupService,
    ) {}


    ngOnInit(): void {
      this.floors = [
        { floor: 1, name: 'Ground Floor' },
        { floor: 2, name: 'First Floor' },
        { floor: 3, name: 'Second Floor' },
        { floor: 4, name: 'Third Floor' },
        { floor: 5, name: 'Fourth Floor' },
      ];

      this.tables = [
        { table: 1, name: 'Table 1', resevationId: 1 },
        { table: 2, name: 'Table 2', resevationId: 2 },
        { table: 3, name: 'Table 3', resevationId: 3 },
        { table: 4, name: 'Table 4', resevationId: 0 },
        { table: 5, name: 'Table 5', resevationId: 0 },
        { table: 6, name: 'Table 6', resevationId: 1 },
        { table: 7, name: 'Table 7', resevationId: 0 },
        { table: 8, name: 'Table 8', resevationId: 1 },
        { table: 9, name: 'Table 9', resevationId: 1 },
        { table: 10, name: 'Table 10', resevationId: 1 },
        { table: 10, name: 'Table 10', resevationId: 1 },
        { table: 10, name: 'Table 10', resevationId: 0 },
        { table: 10, name: 'Table 10', resevationId: 0 },
        { table: 10, name: 'Table 10', resevationId: 0 },
        { table: 10, name: 'Table 10', resevationId: 1 },
        { table: 10, name: 'Table 10', resevationId: 0 },
      ]
    }

    clickOnFloor(selectedfloor:any){
      let clickedFloor = this.floors.find((floor:any)=> floor.floor === selectedfloor.floor);
      this.selectedFloor = clickedFloor.floor; 
      console.log(this.selectedFloor);
    }

    onClickTable(selectedTable:any) {
        selectedTable.resevationId == 0 ? this.onCreateReservation(selectedTable) :
        this.router.navigateByUrl('/order-panel/' + this.orderType + '/' + this.reservationId);
      }

    onCreateReservation(tableData:any){
      this.popupService
      .OpenModel(CreateReservationFormComponent, {
        header: "CREATE RESERVATION",
        width: "40vw",
        data: tableData
      })
      .subscribe((res) => {});
    }
}
