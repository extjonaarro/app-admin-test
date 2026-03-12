/**
 * Genera una referencia numérica aleatoria de 8 dígitos.
 * Útil para comprobantes de suscripción u operaciones que requieran un identificador único.
 * @returns Cadena numérica entre 10000000 y 99999999
 */
export function generateNumericReference(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}
