import { TestBed } from '@angular/core/testing';

import { InteriorService } from './interior.service';

describe('InteriorService', () => {
  let service: InteriorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteriorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
