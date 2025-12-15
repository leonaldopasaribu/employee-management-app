import { EmployeeEntity } from '../../../core/entities/employee.entity';

export class EmployeeListState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  employees: EmployeeEntity[] = [];
}
