export function formatAmount(amount: number, currency: string) {
  return (amount / 100).toFixed(2) + " " + currency;
}
