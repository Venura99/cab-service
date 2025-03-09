import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVehicleInfoComponent } from './driver-vehicle-info.component';

describe('DriverVehicleInfoComponent', () => {
  let component: DriverVehicleInfoComponent;
  let fixture: ComponentFixture<DriverVehicleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverVehicleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverVehicleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
