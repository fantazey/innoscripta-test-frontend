import {COMMON_EXCHANGE_RATE_LOADED, COMMON_TOGGLE_CURRENCY} from "../actionTypes";

const initialState = {
    currencyList: ['usd', 'eur'],
    currentCurrency: 'usd',
    currencyRates: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case COMMON_EXCHANGE_RATE_LOADED:
            const payload = action.payload;
            let currencyRates = {...state.currencyRates};
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
            let current = state.currentCurrency;
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
}