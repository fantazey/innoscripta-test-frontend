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

export function buildPageArray(totalCount, perPage) {
  let count = totalCount / perPage;
  if (totalCount % perPage !== 0) {
    count = Math.floor(totalCount / perPage) + 1;
  }
  const pages = [];
  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  return pages;
}

export function categoryProductsLoadValidation(action, state) {
  if (
    !action.category
    || !action.payload
    || !action.payload.products
    || !Array.isArray(action.payload.products)
  ) {
    return 'Error. Incorrect payload or category';
  }
  if (!state.productsByCategory[action.category]) {
    return 'Error. Wrong category';
  }
  return null;
}

export function categoriesLoadedValidation(action) {
  if (!action.payload || !action.payload.types) {
    return 'Empty categories. Something gone wrong';
  }
  return null;
}
