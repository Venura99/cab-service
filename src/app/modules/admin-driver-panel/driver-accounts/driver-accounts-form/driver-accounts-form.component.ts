import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonForm } from 'src/app/shared/services/app-common-form';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-driver-accounts-form',
  templateUrl: './driver-accounts-form.component.html',
  styleUrls: ['./driver-accounts-form.component.scss']
})
export class DriverAccountsFormComponent {
  FV = new CommonForm();
  foodCategory: any[] = []
  foodType: any[] = []
  foodCategoryData: any
  foodCategoryId: any = 0
  leaveTypeArr: any = [] = [
    { name: "Casual Leave", id: 1 },
    { name: "Annual Leave", id: 2 },
    { name: "Sick Leave", id: 3 },
    { name: "Maternity Leave", id: 4 },
    { name: "Paternity Leave", id: 5 },
    { name: "Unpaid Leave", id: 6 },
    { name: "Other Leave", id: 7 },]
  userRoleType: any = false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private msgService: AppMessageService,
    private msg: MessageService,
    private masterDataService: MasterDataService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.createForm();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      employeeName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.email]],
      leaveCount: ['', Validators.required],
      leaveType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let leaveType = this.leaveTypeArr.find((element: any) => element.id == 1)
    this.FV.setValue("leaveType", leaveType)
  }

  onClickSave() {
    this.ref.close()
  }
}
