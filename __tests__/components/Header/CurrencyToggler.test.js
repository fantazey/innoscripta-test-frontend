import { CurrencyToggler } from '../../../src/components/Header/CurrencyToggler';

jest.mock('../../../src/api', () => ({
  common: {
    loadCurrency: jest.fn()
  }
}));

describe('CurrencyToggler', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      currencyList: ['usd', 'eur'],
      currentCurrency: 'usd',
      currencyLoaded: true,
      toggleCurrency: jest.fn(),
      loadCurrency: jest.fn()
    };
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CurrencyToggler {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render currency buttons', () => {
    const wrapper = shallow(<CurrencyToggler {...defaultProps} />),
      buttons = wrapper.find('.btn');
    expect(buttons).toHaveLength(defaultProps.currencyList.length);
    expect(buttons.first().text()).not.toEqual('');
  });

  it('should toggle currency on button click', () => {
    const wrapper = shallow(<CurrencyToggler {...defaultProps} />),
      button = wrapper.find('span.btn').not('.btn-primary').last();
    button.simulate('click');
    const currency = defaultProps.currencyList[defaultProps.currencyList.length - 1];
    expect(defaultProps.toggleCurrency).toBeCalledTimes(1);
    expect(defaultProps.toggleCurrency).toBeCalledWith(currency);
  });

  it('should not be rendered with single currency config', () => {
    defaultProps.currencyList = ['usd'];
    const wrapper = shallow(<CurrencyToggler {...defaultProps} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should load currency rates if they are not loaded', () => {
    defaultProps.currencyLoaded = false;
    shallow(<CurrencyToggler {...defaultProps} />);
    expect(defaultProps.loadCurrency).toBeCalledTimes(1);
  });
});
