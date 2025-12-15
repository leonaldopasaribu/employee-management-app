import { Injectable } from '@angular/core';
import { SignalsStore } from '../../../shared/base';
import { SignInState } from '../states/sign-in.state';

@Injectable()
export class SignInStore extends SignalsStore<SignInState> {
  constructor() {
    super(new SignInState());
  }

  markAsLoading(): void {
    this.setState({ errorMessage: '', isLoading: true, isError: false });
  }

  markAsError(errorMessage: string): void {
    this.setState({ errorMessage, isLoading: false, isError: true });
  }

  markAsSuccess(): void {
    this.setState({ errorMessage: '', isLoading: false, isError: false });
  }
}
