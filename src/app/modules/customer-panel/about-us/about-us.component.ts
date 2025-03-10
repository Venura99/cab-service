import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  visibleMember: any

  constructor(
    private messageService: AppMessageService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    // this.messageService.showSuccessAlert("Enter")
    // this.msgService.add({
    //   severity: 'success',
    //   summary: 'Login Success!',
    //   detail: "response.Message",
    // });
  }
}
