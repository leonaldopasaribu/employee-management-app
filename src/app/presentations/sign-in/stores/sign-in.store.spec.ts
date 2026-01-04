import { describe, it, expect, beforeEach } from 'vitest';
import { SignInStore } from './sign-in.store';

describe('SignInStore', () => {
  let store: SignInStore;

  beforeEach(() => {
    store = new SignInStore();
  });

  describe('constructor', () => {
    it('should initialize with default state when store is created', () => {
      const state = store.state();

      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.errorMessage).toBe('');
    });
  });

  describe('markAsLoading', () => {
    it('should set isLoading to true when markAsLoading is called', () => {
      store.markAsLoading();

      const state = store.state();

      expect(state.isLoading).toBe(true);
    });

    it('should set isError to false when markAsLoading is called', () => {
      // Set error state first
      store.markAsError('Test error');

      store.markAsLoading();

      const state = store.state();

      expect(state.isError).toBe(false);
    });

    it('should clear errorMessage when markAsLoading is called', () => {
      // Set error state first
      store.markAsError('Test error');

      store.markAsLoading();

      const state = store.state();

      expect(state.errorMessage).toBe('');
    });

    it('should reset all error states when markAsLoading is called after error', () => {
      // Set error state first
      store.markAsError('Previous error');

      store.markAsLoading();

      const state = store.state();

      expect(state.isLoading).toBe(true);
      expect(state.isError).toBe(false);
      expect(state.errorMessage).toBe('');
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
      const errorMessage = 'Invalid credentials';

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
      store.markAsError('Failed to sign in');
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(true);
      expect(store.state().errorMessage).toBe('Failed to sign in');
    });

    it('should handle retry flow when transitioning from error to loading to success', () => {
      // Set error state
      store.markAsError('First attempt failed');
      expect(store.state().isError).toBe(true);

      // Retry - start loading
      store.markAsLoading();
      expect(store.state().isLoading).toBe(true);
      expect(store.state().isError).toBe(false);
      expect(store.state().errorMessage).toBe('');

      // Success
      store.markAsSuccess();
      expect(store.state().isLoading).toBe(false);
      expect(store.state().isError).toBe(false);
    });
  });
});
