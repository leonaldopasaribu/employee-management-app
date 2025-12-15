import { inject, Injectable, Signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPLOYEE_CREATE_FORM_RULES } from '../constants/employee-create.constant';
import { EmployeeCreateForm } from '../models/employee-create.model';
import { EmployeeRepository } from '../../../core/repositories/employee.repository';
import { EmployeeCreateStore } from '../stores/employee-create.store';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { EMPLOYEE_LIST_ROUTE_URL } from '../../../shared/constants/route-url.constant';

@Injectable()
export class EmployeeCreateViewModel {
  private readonly employeeCreateStore = inject(EmployeeCreateStore);
  private readonly employeeRepository = inject(EmployeeRepository);
  private readonly form: FormGroup<EmployeeCreateForm>;
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  constructor() {
    this.form = this.formBuilder.group(
      EMPLOYEE_CREATE_FORM_RULES,
    ) as FormGroup<EmployeeCreateForm>;
  }

  get formGroup(): FormGroup<EmployeeCreateForm> {
    return this.form;
  }

  get $isLoading(): Signal<boolean> {
    return this.employeeCreateStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.employeeCreateStore.select('isError');
  }

  createEmployee(formValue: any): void {
    this.employeeCreateStore.markAsLoading();

    this.employeeRepository
      .create(formValue)
      .pipe(
        finalize(() => {
          this.employeeCreateStore.markAsSuccess();
        }),
      )
      .subscribe({
        next: response => {
          console.log('Employee created successfully:', response);
          this.router.navigateByUrl(EMPLOYEE_LIST_ROUTE_URL);
        },
        error: error => {
          console.error('Error creating employee:', error);
          this.router.navigateByUrl(EMPLOYEE_LIST_ROUTE_URL);
        },
      });
  }

  navigateToEmployeeList(): void {
    this.router.navigateByUrl(EMPLOYEE_LIST_ROUTE_URL);
  }
}
