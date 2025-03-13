import { TestBed } from '@angular/core/testing';

import { ModelTypeService } from './model-type.service';

describe('ModelTypeService', () => {
  let service: ModelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
