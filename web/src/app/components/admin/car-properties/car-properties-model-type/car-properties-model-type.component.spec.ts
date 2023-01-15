import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPropertiesModelTypeComponent } from './car-properties-model-type.component';

describe('CarPropertiesModelTypeComponent', () => {
  let component: CarPropertiesModelTypeComponent;
  let fixture: ComponentFixture<CarPropertiesModelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPropertiesModelTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPropertiesModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
