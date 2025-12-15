import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { EmployeeEntity } from '../../../core/entities/employee.entity';
import { CurrencyIdrPipe } from '../../../shared/pipes';

import { StatusSeverityPipe } from '../pipes';
import { EmployeeDetailStore } from '../stores/employee-detail.store';
import { EmployeeDetailViewModel } from '../view-models/employee-detail.view-model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.html',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    StatusSeverityPipe,
    CurrencyIdrPipe,
  ],
  providers: [EmployeeDetailStore, EmployeeDetailViewModel],
})
export class EmployeeDetail implements OnInit {
  private readonly employeeDetailViewModel = inject(EmployeeDetailViewModel);
  private readonly activatedRoute = inject(ActivatedRoute);

  $employee: Signal<EmployeeEntity | null>;

  constructor() {
    this.$employee = this.employeeDetailViewModel.$employee;
  }

  ngOnInit() {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.employeeDetailViewModel.fetchEmployee(employeeId);
  }

  onOkButtonClick(): void {
    this.employeeDetailViewModel.navigateToEmployeeListPage();
  }
}
