import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartEngineComponent } from './car-part-engine.component';

describe('CarPartEngineComponent', () => {
  let component: CarPartEngineComponent;
  let fixture: ComponentFixture<CarPartEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
