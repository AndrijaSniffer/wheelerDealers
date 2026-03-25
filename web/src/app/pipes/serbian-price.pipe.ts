import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'serbianPrice',
  standalone: true
})
export class SerbianPricePipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toLocaleString('sr-RS', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
