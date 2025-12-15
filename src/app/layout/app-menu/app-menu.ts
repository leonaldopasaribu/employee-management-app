import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DASHBOARD_ROUTE_URL } from '../../shared/constants/route-url.constant';
import { AppMenuitem } from '../app-menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  templateUrl: './app-menu.html',
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: [DASHBOARD_ROUTE_URL],
          },
        ],
      },
      {
        label: '',
        items: [
          {
            label: 'Employee',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Add Employee',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/employee/create'],
              },
              {
                label: 'Employee List',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/employee/list'],
              },
            ],
          },
        ],
      },
    ];
  }
}
