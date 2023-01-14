import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineTypeDialogComponent } from './engine-type-dialog.component';

describe('EngineTypeDialogComponent', () => {
  let component: EngineTypeDialogComponent;
  let fixture: ComponentFixture<EngineTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
