import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAccountsFormComponent } from './driver-accounts-form.component';

describe('DriverAccountsFormComponent', () => {
  let component: DriverAccountsFormComponent;
  let fixture: ComponentFixture<DriverAccountsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverAccountsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverAccountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
