import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditDetailsComponent } from './customer-edit-details.component';

describe('CustomerEditDetailsComponent', () => {
  let component: CustomerEditDetailsComponent;
  let fixture: ComponentFixture<CustomerEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
