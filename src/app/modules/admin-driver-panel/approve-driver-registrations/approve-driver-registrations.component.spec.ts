import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDriverRegistrationsComponent } from './approve-driver-registrations.component';

describe('ApproveDriverRegistrationsComponent', () => {
  let component: ApproveDriverRegistrationsComponent;
  let fixture: ComponentFixture<ApproveDriverRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDriverRegistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDriverRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
