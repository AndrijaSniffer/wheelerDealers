import {TestBed} from '@angular/core/testing';

import {NotificationService} from '@services/notification.service';

describe('NotificationServiceService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
