import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../containers/sign-in').then(m => m.SignIn),
  },
];
