import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { TestVehicleService, Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';

// interface Vehicle {
//   id: number;
//   title: string;
//   brand: string;
//   model: string;
//   price: number;
//   year: number;
//   image: string;
//   special?: boolean;
//   type?: string; // e.g., 'Car', 'Bike'
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  FV!: FormGroup;
  vehicles: Vehicle[] = [];
  specials: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  loading = true;
  totalRecords = 0;
  searchQuery: string = '';
  searchSuggestions: any[] = [];
  selectedPrice: any;
  selectedLocation: any;
  activeFilters: any[] = [];
  currentPage = 0;
  rows = 12;

  // Patpat-inspired data
  categories = [
    { name: 'Cars', icon: 'pi pi-car', type: 'car', count: 1500 },
    { name: 'Bikes', icon: 'pi pi-motorcycle', type: 'bike', count: 800 },
    { name: 'Vans', icon: 'pi pi-truck', type: 'van', count: 300 },
    { name: 'SUVs', icon: 'pi pi-car', type: 'suv', count: 450 },
    { name: 'Trucks', icon: 'pi pi-truck', type: 'truck', count: 120 },
    { name: 'Spare Parts', icon: 'pi pi-cog', type: 'parts', count: 2000 }
  ];
  priceRanges = [
    { label: 'Under LKR 2M', value: 'under2m' },
    { label: 'LKR 2M - 5M', value: '2m-5m' },
    { label: 'LKR 5M - 10M', value: '5m-10m' },
    { label: 'Over LKR 10M', value: 'over10m' }
  ];
  locations = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Nationwide', value: 'all' }
  ];
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: TestVehicleService, // Inject for API calls
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.FV = this.fb.group({});
    this.loadVehicles();
    this.loadSpecials();
  }

  // Add to class
ngAfterViewInit() {
  // Trigger animations on load
  setTimeout(() => {
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
      el.classList.add('animated');
    });
  }, 100);
}

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService.getVehicles({ page: this.currentPage, limit: this.rows }).subscribe({
      next: (data) => {
        this.vehicles = data.vehicles;
        this.filteredVehicles = [...this.vehicles];
        this.totalRecords = data.total;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load vehicles' });
        this.loading = false;
      }
    });
  }

  loadSpecials(): void {
    this.vehicleService.getSpecials().subscribe({
      next: (data) => this.specials = data,
      error: () => console.error('Failed to load specials')
    });
  }

  searchVehicles(event: AutoCompleteCompleteEvent): void {
    // API call for suggestions
    this.vehicleService.searchSuggestions(event.query).subscribe(sugs => {
      this.searchSuggestions = sugs.map(s => ({ name: s.title, type: s.type, icon: s.icon || 'pi pi-car' }));
    });
  }

  onSearchSelect(event: any): void {
    this.performSearch(event.value);
  }

  performSearch(value?: any): void {
    const query = value?.name || this.searchQuery;
    if (query) {
      this.router.navigate(['/vehicles'], { queryParams: { search: query } });
    }
  }

  applyFilter(): void {
    // Logic to filter vehicles by price/location
    let filtered = [...this.vehicles];
    if (this.selectedPrice) filtered = filtered.filter(v => this.filterByPrice(v.price, this.selectedPrice.value));
    if (this.selectedLocation && this.selectedLocation.value !== 'all') filtered = filtered.filter(v => v.location === this.selectedLocation.value);
    
    this.filteredVehicles = filtered;
    // Update activeFilters chips
    this.activeFilters = [
      ...(this.selectedPrice ? [{ name: this.selectedPrice.label }] : []),
      ...(this.selectedLocation ? [{ name: this.selectedLocation.label }] : [])
    ];
  }

  removeFilter(filter: any): void {
    if (filter.label === this.selectedPrice?.label) this.selectedPrice = null;
    if (filter.label === this.selectedLocation?.label) this.selectedLocation = null;
    this.applyFilter();
  }

  clearFilters(): void {
    this.selectedPrice = null;
    this.selectedLocation = null;
    this.activeFilters = [];
    this.filteredVehicles = [...this.vehicles];
  }

  filterByCategory(type: string): void {
    this.router.navigate(['/vehicles'], { queryParams: { type } });
  }

  loadPage(event: any): void {
    this.currentPage = event.page;
    this.loadVehicles();
  }

  trackById(index: number, item: Vehicle): number {
    return item.id;
  }

  postVehicle(): void {
    this.router.navigate(['/post-vehicle']);
  }

  viewVehicle(vehicle: Vehicle): void {  // Fixed name
    this.router.navigate(['/vehicle', vehicle.id]);
  }

  private filterByPrice(price: number, range: string): boolean {
    const p = price / 1000000; // In millions
    switch (range) {
      case 'under2m': return p < 2;
      case '2m-5m': return p >= 2 && p < 5;
      case '5m-10m': return p >= 5 && p < 10;
      case 'over10m': return p >= 10;
      default: return true;
    }
  }
}