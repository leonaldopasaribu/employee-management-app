import { EmployeeEntity } from '../../../core/entities/employee.entity';

export class EmployeeDetailState {
  employee: EmployeeEntity | null = null;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
}
