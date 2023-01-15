import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTypeDialogComponent } from './model-type-dialog.component';

describe('ModelTypeDialogComponent', () => {
  let component: ModelTypeDialogComponent;
  let fixture: ComponentFixture<ModelTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
