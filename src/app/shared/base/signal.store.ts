import { computed, signal, Signal } from '@angular/core';

export class SignalsStore<T> {
  readonly state;

  constructor(initialState: T) {
    this.state = signal(initialState);
  }

  select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  set<K extends keyof T>(key: K, data: T[K]) {
    this.state.update(currentValue => ({ ...currentValue, [key]: data }));
  }

  setState(partialState: Partial<T>): void {
    this.state.update(currentValue => ({ ...currentValue, ...partialState }));
  }
}
