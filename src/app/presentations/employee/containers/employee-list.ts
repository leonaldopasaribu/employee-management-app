import { Component, inject, OnInit, Signal } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';

import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { StatusSeverityPipe } from '../pipes';
import { EmployeeListStore } from '../stores/employee-list.store';
import { EmployeeListViewModel } from '../view-models/employee-list.view-model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  imports: [
    ButtonModule,
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    TooltipModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    IconFieldModule,
    FluidModule,
    StatusSeverityPipe,
  ],
  providers: [EmployeeListStore, EmployeeListViewModel, MessageService],
})
export class EmployeeList implements OnInit {
  private readonly employeeListViewModel = inject(EmployeeListViewModel);

  employees: EmployeeEntity[] = [];
  allEmployees: EmployeeEntity[] = [];

  first: number = 0;
  rowsPerPage: number = 10;

  $isLoading: Signal<boolean>;
  $isError: Signal<boolean>;
  $employees: Signal<EmployeeEntity[]>;

  constructor() {
    this.$isLoading = this.employeeListViewModel.$isLoading;
    this.$isError = this.employeeListViewModel.$isError;
    this.$employees = this.employeeListViewModel.$employees;
  }

  ngOnInit() {
    this.employeeListViewModel.fetchAllEmployees();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
  }

  onAddEmployeeButtonClick(): void {
    this.employeeListViewModel.navigateToEmployeeCreatePage();
  }

  onViewDetailButtonClick(employeeId: string): void {
    this.employeeListViewModel.navigateToEmployeeDetailPage(employeeId);
  }

  onEditButtonClick(employee: EmployeeEntity) {
    this.employeeListViewModel.editEmployee(employee);
  }

  onDeleteButtonClick(employee: EmployeeEntity) {
    this.employeeListViewModel.deleteEmployee(employee);
  }
}
