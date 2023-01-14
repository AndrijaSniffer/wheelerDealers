import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartTransmissionComponent } from './car-part-transmission.component';

describe('CarPartTransmissionComponent', () => {
  let component: CarPartTransmissionComponent;
  let fixture: ComponentFixture<CarPartTransmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartTransmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
