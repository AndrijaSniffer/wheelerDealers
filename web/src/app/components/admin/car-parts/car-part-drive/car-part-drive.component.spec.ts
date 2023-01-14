import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartDriveComponent } from './car-part-drive.component';

describe('CarPartDriveComponent', () => {
  let component: CarPartDriveComponent;
  let fixture: ComponentFixture<CarPartDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
