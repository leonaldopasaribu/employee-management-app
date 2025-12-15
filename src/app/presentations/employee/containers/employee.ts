import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMPLOYEE_PROVIDERS } from '../../../data/employee/employee.provider';

@Component({
  selector: 'app-employee',
  template: `
    <router-outlet></router-outlet>
  `,
  imports: [RouterModule],
  providers: [EMPLOYEE_PROVIDERS],
})
export class Employee {}
