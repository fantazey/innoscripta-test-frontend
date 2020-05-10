import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { promiseMiddleware } from './middleware';
import createReducer from './reducers';

export const history = createHistory();

const initState = {},
  enhancers = [],
  middleware = [
    thunk,
    promiseMiddleware,
    routerMiddleware(history)
  ];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable-next-line */
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

/* eslint-disable-next-line one-var */
const store = createStore(
  createReducer(history),
  initState,
  composedEnhancers
);

export default store;
