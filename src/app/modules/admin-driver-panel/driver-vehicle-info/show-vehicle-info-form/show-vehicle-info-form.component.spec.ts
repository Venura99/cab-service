import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehicleInfoFormComponent } from './show-vehicle-info-form.component';

describe('ShowVehicleInfoFormComponent', () => {
  let component: ShowVehicleInfoFormComponent;
  let fixture: ComponentFixture<ShowVehicleInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVehicleInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVehicleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
