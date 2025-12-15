import { Injectable } from '@angular/core';
import { SignalsStore } from '../../../shared/base';
import { EmployeeCreateState } from '../states/employee-create.state';

@Injectable()
export class EmployeeCreateStore extends SignalsStore<EmployeeCreateState> {
  constructor() {
    super(new EmployeeCreateState());
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
}
