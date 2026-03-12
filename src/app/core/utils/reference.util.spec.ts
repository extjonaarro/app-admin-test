import { describe, it, expect } from 'vitest';
import { generateNumericReference } from './reference.util';

describe('generateNumericReference', () => {
  it('debe retornar una cadena de 8 dígitos', () => {
    const ref = generateNumericReference();
    expect(ref).toMatch(/^\d{8}$/);
  });

  it('debe generar referencias distintas en cada llamada', () => {
    const ref1 = generateNumericReference();
    const ref2 = generateNumericReference();
    expect(ref1).not.toBe(ref2);
  });

  it('el número debe estar entre 10000000 y 99999999', () => {
    const ref = generateNumericReference();
    const num = Number(ref);
    expect(num).toBeGreaterThanOrEqual(10000000);
    expect(num).toBeLessThanOrEqual(99999999);
  });
});
