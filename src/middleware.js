import { BEGIN_ASYNC, END_ASYNC } from "./actionTypes";

export const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    store.dispatch({type: BEGIN_ASYNC});

    action.payload.then(
      result => {
        action.payload = result;
        store.dispatch({type: END_ASYNC});
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error;
        store.dispatch({type: END_ASYNC});
        store.dispatch(action);
      }
    );
    return
  }

  next(action);
};
