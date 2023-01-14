import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartEngineTypeComponent } from './car-part-engine-type.component';

describe('CarPartEngineTypeComponent', () => {
  let component: CarPartEngineTypeComponent;
  let fixture: ComponentFixture<CarPartEngineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartEngineTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartEngineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
