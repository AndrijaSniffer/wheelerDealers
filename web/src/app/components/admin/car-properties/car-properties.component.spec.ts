import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPropertiesComponent } from './car-properties.component';

describe('CarPropertiesComponent', () => {
  let component: CarPropertiesComponent;
  let fixture: ComponentFixture<CarPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
