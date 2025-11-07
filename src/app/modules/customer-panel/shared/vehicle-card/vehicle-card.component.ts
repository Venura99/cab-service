/* src/app/modules/customer-panel/shared/vehicle-card/vehicle-card.component.ts */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Input() isSpecial = false;

  // Add this line
  featuredGradient = 'linear-gradient(135deg, #f59e0b, #d97706)';

  constructor(private router: Router,private route: ActivatedRoute) {}

viewDetails() {
    // ABSOLUTE PATH from the lazy‑loaded module root
    this.router.navigate(['/customer-panel/vehicle', this.vehicle.id]);
  }
}