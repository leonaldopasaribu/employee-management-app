import { Validators } from '@angular/forms';

export const SIGN_IN_FORM_RULES = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
  rememberMe: [false],
};
