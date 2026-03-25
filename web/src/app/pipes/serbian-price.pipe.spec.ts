import {SerbianPricePipe} from '@pipes/serbian-price.pipe';

describe('SerbianPricePipe', () => {
  it('create an instance', () => {
    const pipe = new SerbianPricePipe();
    expect(pipe).toBeTruthy();
  });
});
