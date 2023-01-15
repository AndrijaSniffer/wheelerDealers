import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPropertiesManufacturerComponent } from './car-properties-manufacturer.component';

describe('CarPropertiesManufacturerComponent', () => {
  let component: CarPropertiesManufacturerComponent;
  let fixture: ComponentFixture<CarPropertiesManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPropertiesManufacturerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPropertiesManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
