import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/services/api-services/test-vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Input() isSpecial = false;

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/vehicle', this.vehicle.id]);
  }
}
