import { CurrencyToggler }
  from "../../../src/components/Header/CurrencyToggler";

jest.mock('../../../src/api', () => ({
  common: {
    loadCurrency: jest.fn()
  }
}));

describe('CurrencyToggler', function() {
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

  it('should match snapshot', function () {
    const wrapper = shallow(<CurrencyToggler {...defaultProps}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render currency buttons', function () {
    const wrapper = shallow(<CurrencyToggler {...defaultProps}/>);
    const buttons = wrapper.find('.btn');
    expect(buttons).toHaveLength(defaultProps.currencyList.length);
    expect(buttons.first().text()).not.toEqual('');
  });

  it('should toggle currency on button click', function() {
    const wrapper = shallow(<CurrencyToggler {...defaultProps}/>);
    const button = wrapper.find('span.btn').not('.btn-primary').last();
    button.simulate('click');
    const currency = defaultProps.currencyList[defaultProps.currencyList.length-1];
    expect(defaultProps.toggleCurrency).toBeCalledTimes(1);
    expect(defaultProps.toggleCurrency).toBeCalledWith(currency);
  });

  it('should not be rendered with single currency config', function () {
    defaultProps.currencyList = [ 'usd' ];
    const wrapper = shallow(<CurrencyToggler {...defaultProps}/>);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should load currency rates if they are not loaded', function () {
    defaultProps.currencyLoaded = false;
    const wrapper = shallow(<CurrencyToggler {...defaultProps}/>);
    expect(defaultProps.loadCurrency).toBeCalledTimes(1);
  });
});
