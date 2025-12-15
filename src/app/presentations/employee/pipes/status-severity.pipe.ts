import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSeverity',
})
export class StatusSeverityPipe implements PipeTransform {
  transform(
    status: string,
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | null
    | undefined {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'pending':
        return 'warn';
      default:
        return 'info';
    }
  }
}
