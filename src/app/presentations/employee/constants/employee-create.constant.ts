import { Validators } from '@angular/forms';

export const EMPLOYEE_STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'On Leave', value: 'on_leave' },
  { label: 'Terminated', value: 'terminated' },
];

export const EMPLOYEE_GROUP_OPTIONS = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'human_resources' },
  { label: 'Finance', value: 'finance' },
  { label: 'Operations', value: 'operations' },
  { label: 'Customer Support', value: 'customer_support' },
  { label: 'Product Management', value: 'product_management' },
  { label: 'Quality Assurance', value: 'quality_assurance' },
  { label: 'Research & Development', value: 'research_development' },
];

export const EMPLOYEE_CREATE_FORM_RULES = {
  username: ['', [Validators.required, Validators.minLength(3)]],
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  birthDate: [null, [Validators.required]],
  basicSalary: [null, [Validators.required, Validators.min(0)]],
  status: ['', [Validators.required]],
  group: ['', [Validators.required]],
  description: ['', [Validators.required]],
};
