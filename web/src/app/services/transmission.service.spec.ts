import { TestBed } from '@angular/core/testing';

import { TransmissionTypeService } from './transmission-type.service';

describe('TransmissionService', () => {
  let service: TransmissionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmissionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
