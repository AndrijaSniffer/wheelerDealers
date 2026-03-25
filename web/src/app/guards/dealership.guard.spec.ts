import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {dealershipGuard} from '@guards/dealership.guard';

describe('dealershipGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => dealershipGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
