import { Injectable } from '@angular/core';
import { EmployeeListState } from '../states/employee-list.state';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { SignalsStore } from '../../../shared/base';

@Injectable()
export class EmployeeListStore extends SignalsStore<EmployeeListState> {
  constructor() {
    super(new EmployeeListState());
  }

  markAsLoading(): void {
    this.setState({ errorMessage: '', isLoading: true });
  }

  markAsError(errorMessage: string): void {
    this.setState({ errorMessage, isLoading: false, isError: true });
  }

  markAsSuccess(): void {
    this.setState({ errorMessage: '', isLoading: false, isError: false });
  }

  loadEmployees(employees: EmployeeEntity[]): void {
    this.setState({ employees });
  }
}
