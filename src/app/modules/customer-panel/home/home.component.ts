// src/app/modules/customer-panel/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestVehicleService, Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import { trigger, stagger, query, style, animate } from '@angular/animations';

interface Category {
  name: string;
  type: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInUp', [
      // just a placeholder – index is passed from template
    ])
  ]
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = [];
  specials: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchQuery = '';
  searchSuggestions: any[] = [];
  menuOpen = false;
  profileImage = 'https://i.pravatar.cc/150';

  // Filters
  selectedPrice: any;
  selectedLocation: any;
  activeFilters: any[] = [];
  priceRanges = [
    { label: 'Under 1M', value: 'under1m' },
    { label: '1M - 3M', value: '1m3m' },
    { label: '3M - 5M', value: '3m5m' },
    { label: 'Above 5M', value: 'above5m' }
  ];
  locations = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' }
  ];

  // Pagination
  totalRecords = 0;
  loading = false;

  // Categories
  // home.component.ts
categories = [
  { name: 'Cars',        icon: 'pi pi-car',      color: '#ef4444', count: 1234, type: 'car' },
  { name: 'Bikes',       icon: 'pi pi-bolt',     color: '#3b82f6', count: 876,  type: 'bike' },
  { name: 'Vans',        icon: 'pi pi-truck',    color: '#10b981', count: 543,  type: 'van' },
  { name: 'SUVs',        icon: 'pi pi-shield',   color: '#8b5cf6', count: 789,  type: 'suv' },
  { name: 'Three Wheel', icon: 'pi pi-circle',   color: '#f59e0b', count: 321,  type: 'three-wheel' },
  { name: 'Lorry',       icon: 'pi pi-box',      color: '#6b7280', count: 198,  type: 'lorry' }
];

  // Carousel
  responsiveOptions: CarouselResponsiveOptions[] = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 4 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 3 },
    { breakpoint: '767px',  numVisible: 2, numScroll: 2 },
    { breakpoint: '560px',  numVisible: 1, numScroll: 1 }
  ];

  constructor(
    private router: Router,
    private vehicleService: TestVehicleService
  ) {}

  ngOnInit() {
    this.loadVehicles();
  }

 loadVehicles() {
  this.loading = true;

  // Load first page of vehicles
  this.vehicleService.getVehicles({ page: 0, limit: 12 }).subscribe(page => {
    this.vehicles = page.vehicles;
    this.filteredVehicles = [...page.vehicles];
    this.totalRecords = page.total;
    this.loading = false;
  });

  // Load featured deals
  this.vehicleService.getSpecials().subscribe(specials => {
    this.specials = specials;
  });
}

  searchVehicles(event: any) {
    this.searchSuggestions = this.vehicles
      .filter(v => v.title.toLowerCase().includes(event.query.toLowerCase()))
      .map(v => ({ name: v.title, type: v.type, icon: 'pi pi-car' }));
  }

  onSearchSelect(event: any) {
    this.performSearch();
  }

  performSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/vehicles'], { queryParams: { q: this.searchQuery } });
    }
  }

  postVehicle() {
    this.router.navigate(['/customer-panel/post-vehicle']);
  }

  filterByCategory(type: string) {
    this.filteredVehicles = this.vehicles.filter(v => v.type === type);
  }

  applyFilter() {
    // Implement filter logic
  }

  removeFilter(f: any) {
    // Implement
  }

  clearFilters() {
    this.selectedPrice = null;
    this.selectedLocation = null;
    this.activeFilters = [];
    this.filteredVehicles = [...this.vehicles];
  }

  loadPage(event: any) {
    // Implement pagination
  }

  trackById(index: number, item: Vehicle) {
    return item.id;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}