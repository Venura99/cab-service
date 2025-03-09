import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAccountsComponent } from './driver-accounts.component';

describe('DriverAccountsComponent', () => {
  let component: DriverAccountsComponent;
  let fixture: ComponentFixture<DriverAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
