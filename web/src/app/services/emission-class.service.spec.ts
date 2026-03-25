import {TestBed} from '@angular/core/testing';

import {EmissionClassService} from '@services/emission-class.service';

describe('EmissionClassService', () => {
  let service: EmissionClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
