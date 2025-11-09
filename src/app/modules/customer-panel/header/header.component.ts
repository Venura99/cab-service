// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isDark = false;
  searchQuery = '';
  searchSuggestions: any[] = [];
  profileImage = 'https://i.pravatar.cc/150';

  profileItems = [
    { 
      label: 'My Profile', 
      icon: 'pi pi-user', 
      command: () => this.router.navigate(['/customer-panel/customer-profile']) 
    },
    { 
      label: 'My Ads', 
      icon: 'pi pi-list', 
      command: () => this.router.navigate(['/customer-panel/my-ads']) 
    },
    { 
      label: 'Favorites', 
      icon: 'pi pi-heart', 
      command: () => this.router.navigate(['/customer-panel/favorites']) 
    },
    { separator: true },
    { 
      label: 'Settings', 
      icon: 'pi pi-cog', 
      command: () => this.router.navigate(['/customer-panel/settings']) 
    },
    { 
      label: 'Logout', 
      icon: 'pi pi-sign-out', 
      command: () => this.logout() 
    }
  ];

  // Quick categories for the categories bar
  quickCategories = [
    { name: 'Cars', type: 'car', icon: 'pi pi-car' },
    { name: 'Bikes', type: 'bike', icon: 'pi pi-github' },
    { name: 'Vans', type: 'van', icon: 'pi pi-truck' },
    { name: 'Three Wheelers', type: 'three-wheeler', icon: 'pi pi-map' },
    { name: 'Lorries', type: 'lorry', icon: 'pi pi-inbox' },
    { name: 'Heavy Duty', type: 'heavy-duty', icon: 'pi pi-shield' }
  ];

  // Full categories list for mobile menu
  categories = [
    { name: 'Cars', type: 'car', icon: 'pi pi-car', count: 25000 },
    { name: 'Bikes', type: 'bike', icon: 'pi pi-github', count: 8500 },
    { name: 'Vans', type: 'van', icon: 'pi pi-truck', count: 5200 },
    { name: 'Three Wheelers', type: 'three-wheeler', icon: 'pi pi-map', count: 3800 },
    { name: 'Lorries', type: 'lorry', icon: 'pi pi-inbox', count: 1200 },
    { name: 'Heavy Duty', type: 'heavy-duty', icon: 'pi pi-shield', count: 800 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check for saved dark mode preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      this.isDark = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    // Prevent body scroll when menu is open
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
    // Save preference
    localStorage.setItem('darkMode', this.isDark.toString());
  }

  getSearchSuggestions(event: any) {
    const query = event.query.toLowerCase();
    
    // Mock search suggestions - replace with actual API call
    const allSuggestions = [
      { name: 'Toyota Corolla', icon: 'pi pi-car' },
      { name: 'Honda Civic', icon: 'pi pi-car' },
      { name: 'Nissan Leaf', icon: 'pi pi-car' },
      { name: 'BMW 320i', icon: 'pi pi-car' },
      { name: 'Mercedes Benz C200', icon: 'pi pi-car' },
      { name: 'Suzuki Alto', icon: 'pi pi-car' },
      { name: 'Yamaha FZ', icon: 'pi pi-github' },
      { name: 'Honda CB150', icon: 'pi pi-github' },
      { name: 'Toyota Hiace', icon: 'pi pi-truck' },
      { name: 'Nissan Caravan', icon: 'pi pi-truck' }
    ];

    this.searchSuggestions = allSuggestions.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  }

  performSearch() {
    if (this.searchQuery && this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Navigate to search results
      this.router.navigate(['/customer-panel/home'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
      this.closeMenu();
    }
  }

  filterByCategory(categoryType: string) {
    console.log('Filtering by category:', categoryType);
    // Navigate to filtered results
    this.router.navigate(['/customer-panel/home'], { 
      queryParams: { category: categoryType } 
    });
    this.closeMenu();
  }

  logout() {
    // Clear any stored tokens/data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Navigate to login
    this.router.navigate(['/login']);
    
    // Optional: Show success message
    console.log('Logged out successfully');
  }
}