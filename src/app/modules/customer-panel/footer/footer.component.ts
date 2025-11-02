import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email = '';

  subscribe(): void {
    if (!this.email) return;
    // TODO: call newsletter API
    console.log('Subscribe:', this.email);
    // Reset + optional toast
    this.email = '';
  }
}