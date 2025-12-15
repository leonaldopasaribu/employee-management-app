import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { EmployeeCreateViewModel } from '../view-models/employee-create.view-model';
import { EmployeeCreateForm } from '../models/employee-create.model';
import {
  EMPLOYEE_STATUS_OPTIONS,
  EMPLOYEE_GROUP_OPTIONS,
} from '../constants/employee-create.constant';
import { EmployeeCreateStore } from '../stores/employee-create.store';

@Component({
  selector: 'app-employee-create',
  imports: [
    InputTextModule,
    FluidModule,
    ButtonModule,
    SelectModule,
    ReactiveFormsModule,
    TextareaModule,
    DatePickerModule,
    InputNumberModule,
  ],
  templateUrl: './employee-create.html',
  providers: [EmployeeCreateStore, EmployeeCreateViewModel],
})
export class EmployeeCreate {
  private readonly employeeCreateViewModel = inject(EmployeeCreateViewModel);

  employeeForm!: FormGroup<EmployeeCreateForm>;

  statusOptions = EMPLOYEE_STATUS_OPTIONS;
  groupOptions = EMPLOYEE_GROUP_OPTIONS;
  maxDate: Date = new Date();

  constructor() {
    this.employeeForm = this.employeeCreateViewModel.formGroup;
  }

  onSubmit(): void {
    Object.keys(this.employeeForm.controls).forEach(key => {
      this.employeeForm.get(key)?.markAsTouched();
    });

    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;

      this.employeeCreateViewModel.createEmployee(formValue);
    }
  }

  onCancelButtonClick(): void {
    this.employeeCreateViewModel.navigateToEmployeeList();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (!field) return '';
    if (field.hasError('required')) return 'This field is required';
    if (field.hasError('email')) return 'Please enter a valid email address';
    if (field.hasError('minLength'))
      return `Minimum length is ${field.errors?.['minLength'].requiredLength}`;
    if (field.hasError('min'))
      return 'Value must be greater than or equal to 0';

    return '';
  }
}
