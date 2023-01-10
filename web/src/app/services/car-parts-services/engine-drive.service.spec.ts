import { TestBed } from '@angular/core/testing';

import { EngineDriveService } from './engine-drive.service';

describe('EngineDriveService', () => {
  let service: EngineDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
