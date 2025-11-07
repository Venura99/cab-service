// header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;
  isDark = false;
  searchQuery = '';
  searchSuggestions: any[] = [];
  profileImage = 'https://i.pravatar.cc/150';

  profileItems = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/customer-panel/customer-profile' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
  }

  getSearchSuggestions(event: any) {
    // mock
    this.searchSuggestions = [
      { name: 'Toyota Corolla', icon: 'pi pi-car' },
      { name: 'Honda Civic', icon: 'pi pi-car' }
    ];
  }

  performSearch() {
    console.log('Search:', this.searchQuery);
  }

  logout() {
    // logout logic
  }
}