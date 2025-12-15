import { Provider } from '@angular/core';
import { EmployeeRepository } from '../../core/repositories/employee.repository';
import { EmployeeMapper } from './employee.mapper';
import { EmployeeRepositoryImpl } from './employee.repository.impl';

export const EMPLOYEE_PROVIDERS: Provider[] = [
  {
    provide: EmployeeRepository,
    useClass: EmployeeRepositoryImpl,
  },
  EmployeeMapper,
];
