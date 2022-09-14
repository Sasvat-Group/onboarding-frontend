import thunk from 'redux-thunk';
import { createStore , applyMiddleware , compose } from 'redux';
import combineReducer from './combineReducer';

let composeEnhancers = compose;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const middleware = [thunk]
const store = createStore(combineReducer,composeEnhancers(applyMiddleware(...middleware)))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;