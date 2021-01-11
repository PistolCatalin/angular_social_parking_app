import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkingSpotComponent } from './edit-parking-spot.component';

describe('EditParkingSpotComponent', () => {
  let component: EditParkingSpotComponent;
  let fixture: ComponentFixture<EditParkingSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParkingSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParkingSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
