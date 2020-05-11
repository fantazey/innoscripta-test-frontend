import common, { initialState } from '../../src/reducers/common';
import {
  COMMON_TOGGLE_CURRENCY,
  COMMON_EXCHANGE_RATE_LOADED
} from '../../src/actionTypes';

describe('common reducer', () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should handle unknown action', () => {
    const result = common(state, {});
    expect(result).not.toBe(state);
    expect(result).toEqual(state);
  });
});

describe('common reducer COMMON_TOGGLE_CURRENCY', () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should toggle correct currency', () => {
    const newCurrency = 'eur',
      result = common(
        state,
        {
          type: COMMON_TOGGLE_CURRENCY,
          currency: newCurrency
        }
      );
    expect(result).not.toBe(state);
    expect(result.currentCurrency).toEqual(newCurrency);
    expect(result.currencyList).toEqual(state.currencyList);
    expect(result.currencyRates).toEqual(state.currencyRates);
  });

  it('should toggle correct currency in uppercase', () => {
    const newCurrency = 'EUR',
      result = common(
        state,
        {
          type: COMMON_TOGGLE_CURRENCY,
          currency: newCurrency
        }
      );
    expect(result).not.toBe(state);
    expect(result.currentCurrency).toEqual(newCurrency);
  });

  it('should NOT toggle incorrect currency', () => {
    const newCurrency = 'test',
      result = common(
        state,
        {
          type: COMMON_TOGGLE_CURRENCY,
          currency: newCurrency
        }
      );
    expect(result).not.toBe(state);
    expect(result.currentCurrency).not.toEqual(newCurrency);
  });
});

describe('common reducer COMMON_EXCHANGE_RATE_LOADED', () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should handle loaded rates in payload', () => {
    const payload = {
        rates: {
          EUR: 0.92,
          USD: 1.0
        },
        base: 'USD',
        date: '2020-05-08'
      },
      result = common(state, { type: COMMON_EXCHANGE_RATE_LOADED, payload });

    expect(result).not.toBe(state);
    expect(result.currencyRates).toEqual({
      usd: 1.0,
      eur: 0.92
    });
  });

  it('should handle incorrect payload', () => {
    const payload = {},
      result = common(state, { type: COMMON_EXCHANGE_RATE_LOADED, payload });

    expect(result).not.toBe(state);
    expect(result.currencyRates).toEqual(state.currencyRates);
  });
});
