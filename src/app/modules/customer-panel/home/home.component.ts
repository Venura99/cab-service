// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestVehicleService, Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';
import { trigger } from '@angular/animations';

interface Category {
  name: string;
  type: string;
  icon: string;
  count: number;
  color: string;
  gradient: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInUp', [])
  ]
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = [];
  specials: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchQuery = '';
  searchSuggestions: any[] = [];

  // Filters
  selectedType: any = null;
  selectedPrice: any = null;
  selectedLocation: any = null;
  selectedSort: any = 'latest';
  activeFilters: any[] = [];

  // Filter Options
  vehicleTypes = [
    { label: 'All Types', value: null },
    { label: 'Cars', value: 'car' },
    { label: 'Bikes', value: 'bike' },
    { label: 'Vans', value: 'van' },
    { label: 'SUVs', value: 'suv' }
  ];

  priceRanges = [
    { label: 'All Prices', value: null },
    { label: 'Under 1M', value: '0-1000000' },
    { label: '1M - 3M', value: '1000000-3000000' },
    { label: '3M - 5M', value: '3000000-5000000' },
    { label: '5M - 10M', value: '5000000-10000000' },
    { label: 'Above 10M', value: '10000000-999999999' }
  ];

  locations = [
    { label: 'All Locations', value: null },
    { label: 'Colombo', value: 'colombo' },
    { label: 'Gampaha', value: 'gampaha' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Jaffna', value: 'jaffna' }
  ];

  sortOptions = [
    { label: 'Latest First', value: 'latest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Year: Newest', value: 'year_desc' }
  ];

  // Pagination
  totalRecords = 0;
  pageSize = 12;
  loading = false;

  // Categories with gradients
  categories: Category[] = [
    { 
      name: 'Cars', 
      type: 'car', 
      icon: 'pi pi-car', 
      count: 1234,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      name: 'Bikes', 
      type: 'bike', 
      icon: 'pi pi-bolt', 
      count: 876,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
    },
    { 
      name: 'Vans', 
      type: 'van', 
      icon: 'pi pi-truck', 
      count: 543,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      name: 'SUVs', 
      type: 'suv', 
      icon: 'pi pi-shield', 
      count: 789,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    { 
      name: 'Three Wheel', 
      type: 'three-wheel', 
      icon: 'pi pi-circle', 
      count: 321,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    { 
      name: 'Lorry', 
      type: 'lorry', 
      icon: 'pi pi-box', 
      count: 198,
      color: '#6b7280',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    }
  ];

  // Carousel responsive options
  carouselResponsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: TestVehicleService
  ) {}

  ngOnInit() {
    this.loadVehicles();
    this.checkQueryParams();
  }

  checkQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.performSearch();
      }
      if (params['category']) {
        this.filterByCategory(params['category']);
      }
    });
  }

  loadVehicles() {
    this.loading = true;

    // Load first page of vehicles
    this.vehicleService.getVehicles({ page: 0, limit: this.pageSize }).subscribe(page => {
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
    const query = event.query.toLowerCase();
    
    this.searchSuggestions = this.vehicles
      .filter(v => v.title.toLowerCase().includes(query))
      .slice(0, 8)
      .map(v => ({ 
        name: v.title, 
        type: v.type, 
        icon: 'pi pi-car' 
      }));
  }

  onSearchSelect(event: any) {
    this.searchQuery = event.name;
    this.performSearch();
  }

  performSearch() {
    if (!this.searchQuery) return;
    
    console.log('Searching for:', this.searchQuery);
    this.loading = true;
    
    setTimeout(() => {
      this.filteredVehicles = this.vehicles.filter(v => 
        v.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.totalRecords = this.filteredVehicles.length;
      this.loading = false;
    }, 300);
  }

  filterByCategory(categoryType: string) {
    console.log('Filtering by:', categoryType);
    this.loading = true;
    
    setTimeout(() => {
      this.filteredVehicles = this.vehicles.filter(v => v.type === categoryType);
      this.totalRecords = this.filteredVehicles.length;
      this.loading = false;
    }, 300);
  }

  applyFilter() {
    this.loading = true;
    this.activeFilters = [];

    // Build active filters array
    if (this.selectedType && this.selectedType.value) {
      this.activeFilters.push({ 
        name: this.selectedType.label, 
        type: 'vehicleType', 
        value: this.selectedType 
      });
    }
    if (this.selectedPrice && this.selectedPrice.value) {
      this.activeFilters.push({ 
        name: this.selectedPrice.label, 
        type: 'price', 
        value: this.selectedPrice 
      });
    }
    if (this.selectedLocation && this.selectedLocation.value) {
      this.activeFilters.push({ 
        name: this.selectedLocation.label, 
        type: 'location', 
        value: this.selectedLocation 
      });
    }

    // Apply filters
    let filtered = [...this.vehicles];

    // Filter by type
    if (this.selectedType && this.selectedType.value) {
      filtered = filtered.filter(v => v.type === this.selectedType.value);
    }

    // Filter by price range
    if (this.selectedPrice && this.selectedPrice.value) {
      const [min, max] = this.selectedPrice.value.split('-').map(Number);
      filtered = filtered.filter(v => v.price >= min && v.price <= max);
    }

    // Filter by location
    if (this.selectedLocation && this.selectedLocation.value) {
      filtered = filtered.filter(v => 
        v.location?.toLowerCase() === this.selectedLocation.value.toLowerCase()
      );
    }

    this.filteredVehicles = filtered;
    this.totalRecords = filtered.length;

    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  applySort() {
    let sorted = [...this.filteredVehicles];

    switch (this.selectedSort) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'year_desc':
        sorted.sort((a, b) => b.year - a.year);
        break;
      default: // latest
        // Keep original order
        break;
    }

    this.filteredVehicles = sorted;
  }

  removeFilter(filter: any) {
    switch (filter.type) {
      case 'vehicleType':
        this.selectedType = null;
        break;
      case 'price':
        this.selectedPrice = null;
        break;
      case 'location':
        this.selectedLocation = null;
        break;
    }
    this.applyFilter();
  }

  clearFilters() {
    this.selectedType = null;
    this.selectedPrice = null;
    this.selectedLocation = null;
    this.activeFilters = [];
    this.filteredVehicles = [...this.vehicles];
    this.totalRecords = this.vehicles.length;
  }

  loadPage(event: any) {
    this.loading = true;
    const page = event.page || 0;
    
    this.vehicleService.getVehicles({ page, limit: this.pageSize }).subscribe(result => {
      this.filteredVehicles = result.vehicles;
      this.loading = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  postVehicle() {
    this.router.navigate(['/customer-panel/post-vehicle']);
  }

  trackById(index: number, item: Vehicle) {
    return item.id;
  }
}