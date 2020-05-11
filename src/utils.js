export const currencySymbolMap = {
  usd: '$',
  eur: '€'
};

export function toCurrency(value, currency = 'usd') {
  const key = currency.toLowerCase();
  return `${value} ${currencySymbolMap[key]}`;
}
export function deepClone2(source) {
  return JSON.parse(JSON.stringify(source));
}

export function deepClone(source) {
  let res = null;
  if (typeof source === 'object' && !Array.isArray(source) && source !== null) {
    res = { ...source };
    Object.keys(source).forEach(key => {
      res[key] = deepClone(source[key]);
    });
  } else if (Array.isArray(source)) {
    res = [...source];
    source.forEach((item, index) => {
      res[index] = deepClone(source[index]);
    });
  } else {
    res = source;
  }
  return res;
}
