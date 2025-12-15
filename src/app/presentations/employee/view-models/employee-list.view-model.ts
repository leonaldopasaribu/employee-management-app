import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { EmployeeRepository } from '../../../core/repositories/employee.repository';
import {
  EMPLOYEE_CREATE_ROUTE_URL,
  EMPLOYEE_ROUTE_URL,
} from '../../../shared/constants/route-url.constant';
import { EmployeeListStore } from '../stores/employee-list.store';

@Injectable()
export class EmployeeListViewModel {
  private readonly employeeListStore = inject(EmployeeListStore);
  private readonly employeeRepository = inject(EmployeeRepository);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  get $isLoading(): Signal<boolean> {
    return this.employeeListStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.employeeListStore.select('isError');
  }

  get $employees(): Signal<EmployeeEntity[]> {
    return this.employeeListStore.select('employees');
  }

  fetchAllEmployees() {
    this.employeeListStore.markAsLoading();

    this.employeeRepository
      .fetchAll()
      .pipe(
        finalize(() => {
          this.employeeListStore.markAsSuccess();
        }),
      )
      .subscribe({
        next: response => {
          console.log('Fetched employees:', response);
          this.employeeListStore.loadEmployees(response.data);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching employees:', error);
          this.employeeListStore.markAsError(error.message);
        },
      });
  }

  navigateToEmployeeCreatePage(): void {
    this.router.navigateByUrl(EMPLOYEE_CREATE_ROUTE_URL);
  }

  navigateToEmployeeDetailPage(employeeId: string): void {
    this.router.navigateByUrl(`${EMPLOYEE_ROUTE_URL}/${employeeId}`);
  }

  editEmployee(employee: EmployeeEntity): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Edit Action',
      detail: `Edit employee: ${employee.firstName} ${employee.lastName}`,
      life: 3000,
    });
  }

  deleteEmployee(employee: EmployeeEntity): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Delete Action',
      detail: `Delete employee: ${employee.firstName} ${employee.lastName}`,
      life: 3000,
    });
  }
}
