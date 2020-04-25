const currencySymbolMap = {
  'usd': '$',
  'eur': '€'
};

export function toCurrency(value, currency='usd') {
  const key = currency.toLowerCase();
  return `${value} ${currencySymbolMap[key]}`
}