import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationFormComponent } from './create-reservation-form.component';

describe('CreateReservationFormComponent', () => {
  let component: CreateReservationFormComponent;
  let fixture: ComponentFixture<CreateReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReservationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
