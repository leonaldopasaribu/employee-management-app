import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SignInViewModel } from '../view-models/sign-in.view-model';
import { SignInForm } from '../models/sign-in.model';
import { SignInStore } from '../stores/sign-in.store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RippleModule,
  ],
  providers: [SignInStore, SignInViewModel],
})
export class SignIn {
  private readonly signInViewModel = inject(SignInViewModel);
  signInForm!: FormGroup<SignInForm>;

  checked: boolean = false;

  constructor() {
    this.signInForm = this.signInViewModel.formGroup;
  }

  get isError(): boolean {
    return this.signInViewModel.$isError();
  }

  get errorMessage(): string {
    return this.signInViewModel.$errorMessage();
  }

  get isLoading(): boolean {
    return this.signInViewModel.$isLoading();
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.signInViewModel.signIn();
      return;
    }

    Object.keys(this.signInForm.controls).forEach(key => {
      this.signInForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signInForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.signInForm.get(fieldName);
    if (!field) return '';
    if (field.hasError('required')) return 'This field is required';
    if (field.hasError('email')) return 'Please enter a valid email';
    if (field.hasError('minlength'))
      return `Minimum length is ${field.errors?.['minlength'].requiredLength}`;
    return '';
  }
}
