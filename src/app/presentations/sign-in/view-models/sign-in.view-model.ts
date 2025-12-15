import { Injectable, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE_URL } from '../../../shared/constants/route-url.constant';
import { SIGN_IN_FORM_RULES } from '../constants/sign-in.constant';
import { SignInForm } from '../models/sign-in.model';
import { SignInStore } from '../stores/sign-in.store';

@Injectable()
export class SignInViewModel {
  private readonly signInStore = inject(SignInStore);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly form: FormGroup<SignInForm>;

  constructor() {
    this.form = this.formBuilder.group(
      SIGN_IN_FORM_RULES,
    ) as FormGroup<SignInForm>;
  }

  get formGroup(): FormGroup<SignInForm> {
    return this.form;
  }

  get $isLoading(): Signal<boolean> {
    return this.signInStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.signInStore.select('isError');
  }

  get $errorMessage(): Signal<string> {
    return this.signInStore.select('errorMessage');
  }

  signIn(): void {
    this.router.navigateByUrl(DASHBOARD_ROUTE_URL);
  }
}
