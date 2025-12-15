import { Routes } from '@angular/router';

import { AppLayout } from './layout/app-layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./presentations/dashboard/routes/dashboard.routes').then(
            m => m.routes,
          ),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./presentations/employee/routes/employee.routes').then(
            m => m.routes,
          ),
      },
    ],
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./presentations/sign-in/routes/sign-in.routes').then(
        m => m.routes,
      ),
  },

  { path: '**', pathMatch: 'full', redirectTo: 'sign-in' },
];
