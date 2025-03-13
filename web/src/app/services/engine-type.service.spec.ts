import { TestBed } from '@angular/core/testing';

import { EngineTypeService } from './engine-type.service';

describe('EngineTypeService', () => {
  let service: EngineTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
