import Navigation from "../../../src/components/Header/Navigation";

describe('Navigation', function () {
  let wrapper;
  let categories = [
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
      <Navigation categories={categories}/>
    )
  });

  it('should match snapshot', function() {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all passed categories', function() {
    expect(wrapper.find('ul').children()).toHaveLength(categories.length);
  });

  it('should pass props correctly', function() {
    let child = wrapper.find('NavLink').first();
    expect(child.prop('to')).toEqual(categories[0].path);
    expect(child.text()).toEqual(categories[0].label);
  })
});
