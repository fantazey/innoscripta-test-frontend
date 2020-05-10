import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './common';
import menu from './menu';
import order from './order';

export default history => combineReducers({
  router: connectRouter(history),
  common,
  menu,
  order
});
