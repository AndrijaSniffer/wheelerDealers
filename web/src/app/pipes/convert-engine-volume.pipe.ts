import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertEngineVolume'
})
export class ConvertEngineVolumePipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    // Handle null or undefined cases
    if (value == null) { // Covers both null and undefined
      return 'N/A'; // Or any placeholder like "-" or ""
    }
    // Convert the number and format to one decimal place
    const converted = value / 1000;
    return converted.toFixed(1);
  }

}
