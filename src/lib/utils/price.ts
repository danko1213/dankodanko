export function formatPrice(amount: number, currency = "EUR"): string {
  return `${amount.toFixed(2)} €`;
}

export function calculateServiceFee(
  subtotal: number,
  feePercent: number,
  feeFixed: number
): number {
  return Math.round((subtotal * feePercent / 100 + feeFixed) * 100) / 100;
}

export function calculateTip(
  subtotal: number,
  tipPercent: number | null,
  tipCustom: number | null
): number {
  if (tipCustom !== null && tipCustom > 0) return tipCustom;
  if (tipPercent !== null && tipPercent > 0) {
    return Math.round(subtotal * tipPercent / 100 * 100) / 100;
  }
  return 0;
}
