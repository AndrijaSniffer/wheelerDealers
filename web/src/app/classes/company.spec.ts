import {Company} from '@classes/company';

describe('Company', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Company()).toBeTruthy();
  });
});
