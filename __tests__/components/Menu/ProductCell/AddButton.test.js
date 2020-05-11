import AddButton from '../../../../src/components/Menu/ProductCell/AddButton';

describe('Menu/ProductCell/AddButton', () => {
  let wrapper;
  const defaultProps = {
    add: jest.fn(),
    price: 12.12
  };

  beforeEach(() => {
    wrapper = shallow(<AddButton {...defaultProps} />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click', () => {
    wrapper.simulate('click');
    expect(defaultProps.add).toHaveBeenCalledTimes(1);
  });
});
