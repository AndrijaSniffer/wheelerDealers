import { CompanyFactory } from './company.factory';

describe('CompanyFactory', () => {
  it('should create an instance', () => {
    expect(new CompanyFactory()).toBeTruthy();
  });
});
