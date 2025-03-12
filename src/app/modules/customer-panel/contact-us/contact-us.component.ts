import { Component } from '@angular/core';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
 constructor(
    // private formBuilder: FormBuilder,
    // private router: Router,
    private msgService: AppMessageService,
  ) {
  }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.msgService.showSuccessAlert('Thank you! Your message has been sent successfully');
  }
}


