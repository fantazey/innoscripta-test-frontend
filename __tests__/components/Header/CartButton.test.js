import CartButton from '../../../src/components/Header/CartButton';

describe('CartButton', () => {
  let wrapper;

  beforeEach(() => {
    const price = 12;
    wrapper = shallow(
      <CartButton cartPrice={price} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Button label should be translated', () => {
    const label = wrapper.find('span').first();
    expect(label.text().startsWith('_')).toEqual(true);
  });
});
