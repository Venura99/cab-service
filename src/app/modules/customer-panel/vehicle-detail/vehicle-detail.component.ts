// src/app/modules/customer-panel/vehicle-detail/vehicle-detail.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestVehicleService, Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';

declare var google: any;

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  vehicle!: Vehicle;
  galleryImages: any[] = [];
  currentImage: string = '';
  galleryResponsive = [
    { breakpoint: '1024px', numVisible: 4 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  constructor(
    private route: ActivatedRoute,
    private vehicleService: TestVehicleService
  ) {}

  ngOnInit() {
    this.currentImage = this.galleryImages[0]?.src;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadVehicle(id);
  }

  loadVehicle(id: number) {
    // In real app: fetch from API
    debugger
    this.vehicleService.getVehicles({ page: 0, limit: 100 }).subscribe(page => {
      const found = page.vehicles.find(v => v.id === id);
      if (found) {
        this.vehicle = found;
        this.galleryImages = [
          { src: found.image },
          { src: 'https://riyasewana.com/thumb/thumbtoyota-corolla-121-119423217721.jpg' },
          { src: 'https://riyasewana.com/thumb/thumbtoyota-corolla-ce110-2155754801.jpg' },
          { src: 'https://riyasewana.com/thumb/thumbhonda-civic-2018-215444912931.jpg' }
        ];
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 500);
  }

  initMap() {
    const location = { lat: 6.9271, lng: 79.8612 }; // Colombo
    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: location,
      zoom: 15,
      mapTypeId: 'roadmap',
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
      ]
    });
    new google.maps.Marker({
      position: location,
      map,
      title: 'Vehicle Location'
    });
  }

  callSeller() {
    window.location.href = 'tel:+94771234567';
  }

  whatsappSeller() {
    const msg = encodeURIComponent(`Hi! I'm interested in your ${this.vehicle.title}`);
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  }

  openMessage() {
    alert('Message form coming soon!');
  }
}