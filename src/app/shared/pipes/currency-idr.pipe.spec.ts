import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CurrencyIdrPipe } from './currency-idr.pipe';

describe('CurrencyIdrPipe', () => {
  let pipe: CurrencyIdrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyIdrPipe],
    });
    pipe = TestBed.inject(CurrencyIdrPipe);
  });

  it('should create an instance when pipe is initialized', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted IDR currency when given a whole number', () => {
    const result = pipe.transform(1_000_000);
    expect(result).toBe('Rp. 1.000.000,00');
  });

  it('should return formatted IDR currency with correct decimal places when given a decimal number', () => {
    const result = pipe.transform(1_234_567.89);
    expect(result).toBe('Rp. 1.234.567,89');
  });

  it('should return "Rp. 0,00" when given zero value', () => {
    const result = pipe.transform(0);
    expect(result).toBe('Rp. 0,00');
  });

  it('should return "Rp. 0,00" when given null value', () => {
    const result = pipe.transform(null);
    expect(result).toBe('Rp. 0,00');
  });

  it('should return "Rp. 0,00" when given undefined value', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('Rp. 0,00');
  });

  it('should return formatted negative IDR currency when given a negative number', () => {
    const result = pipe.transform(-5_000);
    expect(result).toBe('Rp. -5.000,00');
  });

  it('should return formatted IDR currency with decimals when given a small decimal number', () => {
    const result = pipe.transform(123.45);
    expect(result).toBe('Rp. 123,45');
  });

  it('should return formatted IDR currency with thousands separator when given a large number', () => {
    const result = pipe.transform(9_999_999_999.99);
    expect(result).toBe('Rp. 9.999.999.999,99');
  });

  it('should return formatted IDR currency with two decimal places when given a number with single decimal', () => {
    const result = pipe.transform(100.5);
    expect(result).toBe('Rp. 100,50');
  });

  it('should return formatted IDR currency with two decimal places when given a whole number with no decimals', () => {
    const result = pipe.transform(5000);
    expect(result).toBe('Rp. 5.000,00');
  });

  it('should return formatted IDR currency correctly when given very small decimal number', () => {
    const result = pipe.transform(0.99);
    expect(result).toBe('Rp. 0,99');
  });

  it('should return formatted IDR currency correctly when given negative decimal number', () => {
    const result = pipe.transform(-1_234.56);
    expect(result).toBe('Rp. -1.234,56');
  });
});
