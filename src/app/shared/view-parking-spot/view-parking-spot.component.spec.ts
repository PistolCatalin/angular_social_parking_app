import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParkingSpotComponent } from './view-parking-spot.component';

describe('ViewParkingSpotComponent', () => {
  let component: ViewParkingSpotComponent;
  let fixture: ComponentFixture<ViewParkingSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParkingSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParkingSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
