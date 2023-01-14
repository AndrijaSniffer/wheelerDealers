import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartInteriorComponent } from './car-part-interior.component';

describe('CarPartInteriorComponent', () => {
  let component: CarPartInteriorComponent;
  let fixture: ComponentFixture<CarPartInteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartInteriorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartInteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
