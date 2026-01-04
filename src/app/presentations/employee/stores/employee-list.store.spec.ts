import { describe, it, expect, beforeEach } from 'vitest';
import { EmployeeListStore } from './employee-list.store';
import { EmployeeEntity } from '../../../core/entities/employee.entity';

describe('EmployeeListStore', () => {
  let store: EmployeeListStore;

  const mockEmployees: EmployeeEntity[] = [
    {
      id: '1',
      username: 'john.doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: new Date('1990-01-01'),
      basicSalary: 5000000,
      status: 'Active',
      group: 'Engineering',
      description: 'Software Engineer',
    },
    {
      id: '2',
      username: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      birthDate: new Date('1992-05-15'),
      basicSalary: 6000000,
      status: 'Active',
      group: 'Product',
      description: 'Product Manager',
    },
  ];

  beforeEach(() => {
    store = new EmployeeListStore();
  });

  describe('constructor', () => {
    it('should initialize with default state when store is created', () => {
      const state = store.state();

      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.errorMessage).toBe('');
      expect(state.employees).toEqual([]);
    });
  });

  describe('markAsLoading', () => {
    it('should set isLoading to true when markAsLoading is called', () => {
      store.markAsLoading();

      const state = store.state();

      expect(state.isLoading).toBe(true);
    });

    it('should clear errorMessage when markAsLoading is called', () => {
      // Set error state first
      store.markAsError('Test error');

      store.markAsLoading();

      const state = store.state();

      expect(state.errorMessage).toBe('');
    });

    it('should clear errorMessage but keep isError when markAsLoading is called after error', () => {
      // Set error state first
      store.markAsError('Previous error');

      store.markAsLoading();

      const state = store.state();

      expect(state.isLoading).toBe(true);
      expect(state.isError).toBe(true);
      expect(state.errorMessage).toBe('');
    });

    it('should not affect employees array when markAsLoading is called', () => {
      // Load employees first
      store.loadEmployees(mockEmployees);

      store.markAsLoading();

      const state = store.state();

      expect(state.employees).toEqual(mockEmployees);
    });
  });

  describe('markAsError', () => {
    it('should set isError to true when markAsError is called', () => {
      store.markAsError('An error occurred');

      const state = store.state();

      expect(state.isError).toBe(true);
    });

    it('should set isLoading to false when markAsError is called', () => {
      // Set loading state first
      store.markAsLoading();

      store.markAsError('An error occurred');

      const state = store.state();

      expect(state.isLoading).toBe(false);
    });

    it('should set errorMessage when markAsError is called with error message', () => {
      const errorMessage = 'Failed to load employees';

      store.markAsError(errorMessage);

      const state = store.state();

      expect(state.errorMessage).toBe(errorMessage);
    });

    it('should update errorMessage when markAsError is called multiple times', () => {
      store.markAsError('First error');
      store.markAsError('Second error');

      const state = store.state();

      expect(state.errorMessage).toBe('Second error');
    });

    it('should set all error state properties correctly when markAsError is called during loading', () => {
      store.markAsLoading();

      store.markAsError('Network error');

      const state = store.state();

      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.errorMessage).toBe('Network error');
    });

    it('should not affect employees array when markAsError is called', () => {
      // Load employees first
      store.loadEmployees(mockEmployees);

      store.markAsError('An error occurred');

      const state = store.state();

      expect(state.employees).toEqual(mockEmployees);
    });
  });

  describe('markAsSuccess', () => {
    it('should set isLoading to false when markAsSuccess is called', () => {
      // Set loading state first
      store.markAsLoading();

      store.markAsSuccess();

      const state = store.state();

      expect(state.isLoading).toBe(false);
    });

    it('should set isError to false when markAsSuccess is called', () => {
      // Set error state first
      store.markAsError('Test error');

      store.markAsSuccess();

      const state = store.state();

      expect(state.isError).toBe(false);
    });

    it('should clear errorMessage when markAsSuccess is called', () => {
      // Set error state first
      store.markAsError('Test error');

      store.markAsSuccess();

      const state = store.state();

      expect(state.errorMessage).toBe('');
    });

    it('should reset all state to default when markAsSuccess is called after error', () => {
      store.markAsError('Previous error');

      store.markAsSuccess();

      const state = store.state();

      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.errorMessage).toBe('');
    });

    it('should reset all state to default when markAsSuccess is called after loading', () => {
      store.markAsLoading();

      store.markAsSuccess();

      const state = store.state();

      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.errorMessage).toBe('');
    });

    it('should not affect employees array when markAsSuccess is called', () => {
      // Load employees first
      store.loadEmployees(mockEmployees);

      store.markAsSuccess();

      const state = store.state();

      expect(state.employees).toEqual(mockEmployees);
    });
  });

  describe('loadEmployees', () => {
    it('should set employees array when loadEmployees is called with data', () => {
      store.loadEmployees(mockEmployees);

      const state = store.state();

      expect(state.employees).toEqual(mockEmployees);
      expect(state.employees).toHaveLength(2);
    });

    it('should replace existing employees when loadEmployees is called multiple times', () => {
      const firstBatch = [mockEmployees[0]];
      const secondBatch = mockEmployees;

      store.loadEmployees(firstBatch);
      expect(store.state().employees).toHaveLength(1);

      store.loadEmployees(secondBatch);
      expect(store.state().employees).toHaveLength(2);
      expect(store.state().employees).toEqual(secondBatch);
    });

    it('should set empty array when loadEmployees is called with empty array', () => {
      // Load employees first
      store.loadEmployees(mockEmployees);
      expect(store.state().employees).toHaveLength(2);

      // Clear employees
      store.loadEmployees([]);

      const state = store.state();

      expect(state.employees).toEqual([]);
      expect(state.employees).toHaveLength(0);
    });

    it('should not affect loading state when loadEmployees is called', () => {
      store.markAsLoading();

      store.loadEmployees(mockEmployees);

      const state = store.state();

      expect(state.isLoading).toBe(true);
    });

    it('should not affect error state when loadEmployees is called', () => {
      store.markAsError('Test error');

      store.loadEmployees(mockEmployees);

      const state = store.state();

      expect(state.isError).toBe(true);
      expect(state.errorMessage).toBe('Test error');
    });

    it('should preserve employee data integrity when loadEmployees is called', () => {
      store.loadEmployees(mockEmployees);

      const state = store.state();
      const firstEmployee = state.employees[0];

      expect(firstEmployee.id).toBe('1');
      expect(firstEmployee.username).toBe('john.doe');
      expect(firstEmployee.firstName).toBe('John');
      expect(firstEmployee.lastName).toBe('Doe');
      expect(firstEmployee.email).toBe('john.doe@example.com');
      expect(firstEmployee.basicSalary).toBe(5000000);
      expect(firstEmployee.status).toBe('Active');
      expect(firstEmployee.group).toBe('Engineering');
    });
  });

  describe('state transitions', () => {
    it('should handle complete loading flow when transitioning from idle to loading to success', () => {
      // Initial state
      expect(store.state().isLoading).toBe(false);

      // Start loading
      store.markAsLoading();
      expect(store.state().isLoading).toBe(true);
      expect(store.state().isError).toBe(false);

      // Mark as success
      store.markAsSuccess();
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(false);
      expect(store.state().errorMessage).toBe('');
    });

    it('should handle error flow when transitioning from idle to loading to error', () => {
      // Initial state
      expect(store.state().isLoading).toBe(false);

      // Start loading
      store.markAsLoading();
      expect(store.state().isLoading).toBe(true);

      // Mark as error
      store.markAsError('Failed to load employees');
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(true);
      expect(store.state().errorMessage).toBe('Failed to load employees');
    });

    it('should handle retry flow when transitioning from error to loading to success', () => {
      // Set error state
      store.markAsError('First attempt failed');
      expect(store.state().isError).toBe(true);

      // Retry - start loading (clears errorMessage but keeps isError true)
      store.markAsLoading();
      expect(store.state().isLoading).toBe(true);
      expect(store.state().isError).toBe(true);
      expect(store.state().errorMessage).toBe('');

      // Success - resets everything
      store.markAsSuccess();
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(false);
    });

    it('should handle full employee loading flow when transitioning through all states with data', () => {
      // Start loading
      store.markAsLoading();
      expect(store.state().isLoading).toBe(true);
      expect(store.state().employees).toHaveLength(0);

      // Load employees
      store.loadEmployees(mockEmployees);
      expect(store.state().employees).toHaveLength(2);

      // Mark as success
      store.markAsSuccess();
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(false);
      expect(store.state().employees).toHaveLength(2);
    });

    it('should handle error during loading without losing existing data when error occurs after loading employees', () => {
      // Load initial employees
      store.loadEmployees([mockEmployees[0]]);
      expect(store.state().employees).toHaveLength(1);

      // Start loading more employees
      store.markAsLoading();

      // Error occurs
      store.markAsError('Failed to load more employees');
      expect(store.state().isError).toBe(true);
      expect(store.state().employees).toHaveLength(1);
    });

    it('should handle complete refresh flow when reloading employees after success', () => {
      // Initial load
      store.markAsLoading();
      store.loadEmployees([mockEmployees[0]]);
      store.markAsSuccess();
      expect(store.state().employees).toHaveLength(1);

      // Refresh
      store.markAsLoading();
      store.loadEmployees(mockEmployees);
      store.markAsSuccess();
      expect(store.state().employees).toHaveLength(2);
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(false);
    });
  });
});
