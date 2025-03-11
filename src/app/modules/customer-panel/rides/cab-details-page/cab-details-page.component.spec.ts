import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabDetailsPageComponent } from './cab-details-page.component';

describe('CabDetailsPageComponent', () => {
  let component: CabDetailsPageComponent;
  let fixture: ComponentFixture<CabDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
