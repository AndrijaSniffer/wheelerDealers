import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivetrainComponent } from './drivetrain.component';

describe('DrivetrainComponent', () => {
  let component: DrivetrainComponent;
  let fixture: ComponentFixture<DrivetrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivetrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivetrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
