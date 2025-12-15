import { FormControl } from '@angular/forms';

export interface EmployeeCreateForm {
  username: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  basicSalary: FormControl<number | null>;
  status: FormControl<string | null>;
  group: FormControl<string | null>;
  description: FormControl<string | null>;
}
