import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIdr',
})
export class CurrencyIdrPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'Rp. 0,00';
    }

    const formattedNumber = value.toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `Rp. ${formattedNumber}`;
  }
}
