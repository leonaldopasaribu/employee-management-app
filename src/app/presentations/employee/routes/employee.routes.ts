import { Routes } from '@angular/router';

import { Employee } from '../containers/employee';

export const routes: Routes = [
  {
    path: '',
    component: Employee,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../containers/employee-list').then(m => m.EmployeeList),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../containers/employee-create').then(
            m => m.EmployeeCreate,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../containers/employee-detail').then(
            m => m.EmployeeDetail,
          ),
      },
    ],
  },
];
