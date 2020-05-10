import {
  COMMON_EXCHANGE_RATE_LOADED,
  COMMON_TOGGLE_CURRENCY
} from '../actionTypes';

export const initialState = {
  currencyList: ['usd', 'eur'],
  currentCurrency: 'usd',
  currencyRates: {}
};


export default (state = initialState, action) => {
  let payload,
    current,
    currencyRates;
  switch (action.type) {
    case COMMON_EXCHANGE_RATE_LOADED:
      payload = action.payload;
      currencyRates = { ...state.currencyRates };
      if (payload.hasOwnProperty('rates')) {
        Object.keys(payload.rates).forEach(key => {
          currencyRates[key.toLowerCase()] = payload.rates[key];
        });
      }
      return {
        ...state,
        currencyRates
      };
    case COMMON_TOGGLE_CURRENCY:
      current = state.currentCurrency;
      if (state.currencyList.includes(action.currency.toLowerCase())) {
        current = action.currency;
      }
      return {
        ...state,
        currentCurrency: current
      };
    default:
      return {
        ...state
      };
  }
};
