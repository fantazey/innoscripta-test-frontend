import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CurrencyPrice from "../../src/components/CurrencyPrice";
import {initialState} from '../../src/reducers/common';

const mockStore = configureMockStore([]);

describe('CurrencyPrice', function () {
  let initialStore;
  let price = 12.12;

  beforeEach(() => {
    initialStore = {
      common: {
        ...initialState,
        currencyRates: {
          'usd': 1,
          'eur': 2
        }
      }
    };
  });

  it('should match snapshot', () => {
    const store = mockStore(initialStore);
    let wrapper = mount(
      <Provider store={store}>
        <CurrencyPrice price={price}/>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render if rates are empty', () => {
    initialStore.common.currencyRates = {};
    const store = mockStore(initialStore);
    let wrapper = mount(
      <Provider store={store}>
        <CurrencyPrice price={price}/>
      </Provider>
    );
    const component = wrapper.find('CurrencyPrice');
    expect(component.isEmptyRender()).toBe(true);
  });

  it('should not render if rates are not finite', () => {
    initialStore.common.currencyRates = {
      'usd': Number.POSITIVE_INFINITY
    };
    const store = mockStore(initialStore);
    let wrapper = mount(
      <Provider store={store}>
        <CurrencyPrice price={price}/>
      </Provider>
    );
    const component = wrapper.find('CurrencyPrice');
    expect(component.isEmptyRender()).toBe(true);
  });

  it('should calculate price based on rate', () => {
    const rate = 4;
    const result = price * rate;
    initialStore.common.currencyRates = {
      'usd': rate
    };
    const store = mockStore(initialStore);
    let wrapper = mount(
      <Provider store={store}>
        <CurrencyPrice price={price}/>
      </Provider>
    );
    const component = wrapper.find('CurrencyPrice');
    expect(component.text()).toContain(result);
  });
});
