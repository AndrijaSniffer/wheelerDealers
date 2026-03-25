import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmissionClassComponent} from '@admin/emission-class/emission-class.component';

describe('EmissionClassComponent', () => {
  let component: EmissionClassComponent;
  let fixture: ComponentFixture<EmissionClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionClassComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmissionClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
