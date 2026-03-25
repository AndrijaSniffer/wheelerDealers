import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EngineTypeComponent} from '@admin/engine-type/engine-type.component';

describe('EngineTypeComponent', () => {
  let component: EngineTypeComponent;
  let fixture: ComponentFixture<EngineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineTypeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EngineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
