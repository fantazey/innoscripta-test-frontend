import Navigation from '../../../src/components/Header/Navigation';

describe('Navigation', () => {
  let wrapper;
  const categories = [
    {
      path: '1',
      label: '1'
    },
    {
      path: '2',
      label: '2'
    }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <Navigation categories={categories} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all passed categories', () => {
    expect(wrapper.find('ul').children()).toHaveLength(categories.length);
  });

  it('should pass props correctly', () => {
    const child = wrapper.find('NavLink').first();
    expect(child.prop('to')).toEqual(categories[0].path);
    expect(child.text()).toEqual(categories[0].label);
  });
});
