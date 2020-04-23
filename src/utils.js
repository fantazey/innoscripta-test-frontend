const currencySymbolMap = {
  'usd': '$',
  'eur': '€'
};

export function toCurrency(value, currency='eur') {
  const key = currency.toLowerCase();
  return `${value} ${currencySymbolMap[key]}`
}