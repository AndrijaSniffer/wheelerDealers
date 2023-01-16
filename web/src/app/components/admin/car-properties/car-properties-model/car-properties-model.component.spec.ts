import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPropertiesModelComponent } from './car-properties-model.component';

describe('CarPropertiesModelComponent', () => {
  let component: CarPropertiesModelComponent;
  let fixture: ComponentFixture<CarPropertiesModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPropertiesModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPropertiesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
