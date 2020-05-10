import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: text => `_${text}` };
    return Component;
  },
  useTranslation: () => ({
    t: text => `_${text}`
  })
}));
