import { Injectable, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { EmployeeDetailStore } from '../stores/employee-detail.store';
import { Location } from '@angular/common';

import { EmployeeRepository } from '../../../core/repositories/employee.repository';
import { finalize } from 'rxjs';
import { EMPLOYEE_LIST_ROUTE_URL } from '../../../shared/constants/route-url.constant';

@Injectable()
export class EmployeeDetailViewModel {
  private readonly employeeDetailStore = inject(EmployeeDetailStore);
  private readonly employeeRepository = inject(EmployeeRepository);
  private readonly router = inject(Router);

  get $isLoading(): Signal<boolean> {
    return this.employeeDetailStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.employeeDetailStore.select('isError');
  }

  get $employee(): Signal<EmployeeEntity | null> {
    return this.employeeDetailStore.select('employee');
  }

  fetchEmployee(employeeId: string): void {
    this.employeeDetailStore.markAsLoading();

    this.employeeRepository
      .fetchOne(employeeId)
      .pipe(
        finalize(() => {
          this.employeeDetailStore.markAsSuccess();
        }),
      )
      .subscribe({
        next: (employee: EmployeeEntity) => {
          this.employeeDetailStore.loadEmployee(employee);
          this.employeeDetailStore.markAsSuccess();
        },
        error: (error: any) => {
          console.error('Error fetching employee:', error);
          this.employeeDetailStore.markAsError(error.message);
        },
      });
  }

  navigateToEmployeeListPage(): void {
    this.router.navigateByUrl(EMPLOYEE_LIST_ROUTE_URL);
  }
}
