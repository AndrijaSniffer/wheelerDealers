import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionTypeComponent } from './transmission-type.component';

describe('TransmissionComponent', () => {
  let component: TransmissionTypeComponent;
  let fixture: ComponentFixture<TransmissionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
