import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartFuelComponent } from './car-part-fuel.component';

describe('CarPartFuelComponent', () => {
  let component: CarPartFuelComponent;
  let fixture: ComponentFixture<CarPartFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartFuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
