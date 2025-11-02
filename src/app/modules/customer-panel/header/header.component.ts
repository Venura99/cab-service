import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  profileImage: string | null = null;
  menuOpen = false;
  profileItems: MenuItem[] = [];
  searchQuery: any;
  searchSuggestions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('CurrentUserName');
    this.profileImage = localStorage.getItem('profileImage') || 'assets/default-profile.png'; // Fallback image

    this.profileItems = [
      {
        label: 'My Profile',
        icon: 'pi pi-user',
        command: () => this.navigateTo('/customer-panel/profile')
      },
      {
        label: 'My Ads',
        icon: 'pi pi-list',
        command: () => this.navigateTo('/customer-panel/my-ads')
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-cart',
        command: () => this.navigateTo('/customer-panel/orders')
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeMenu();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  getSearchSuggestions(event: AutoCompleteCompleteEvent): void {
    // Implement API call or local logic for suggestions
    // Example: this.searchSuggestions = [...]; // Fetch from service
    this.searchSuggestions = [
      { name: 'Toyota Corolla' },
      { name: 'Honda Civic' },
      { name: 'Spare Tires' }
      // Add more based on backend
    ].filter(item => item.name.toLowerCase().includes(event.query.toLowerCase()));
  }

  performSearch(): void {
    // Implement search logic, e.g., navigate to search results
    if (this.searchQuery) {
      this.router.navigate(['/customer-panel/search'], { queryParams: { q: this.searchQuery.name || this.searchQuery } });
    }
  }
}