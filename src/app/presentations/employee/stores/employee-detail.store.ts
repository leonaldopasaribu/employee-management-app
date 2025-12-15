import { Injectable } from '@angular/core';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { SignalsStore } from '../../../shared/base';
import { EmployeeDetailState } from '../states/employee-detail.state';

@Injectable()
export class EmployeeDetailStore extends SignalsStore<EmployeeDetailState> {
  constructor() {
    super(new EmployeeDetailState());
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

  loadEmployee(employee: EmployeeEntity): void {
    this.setState({ employee });
  }
}
