import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { promiseMiddleware } from './middleware';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createReducer from './reducers'

export const history = createHistory();

const initState = {};
const enhancers = [];
const middleware = [
  thunk,
  promiseMiddleware,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  createReducer(history),
  initState,
  composedEnhancers
);

export default store;