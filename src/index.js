import 'tachyons';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import {routerForBrowser} from 'redux-little-router';
import reducers, {initialState} from './reducers';
import routes from './routes';
import App from './containers/App';

const {
  enhancer: routerEnhancer,
  middleware: routerMiddleware,
  reducer: router,
} = routerForBrowser({routes});
const store = createStore(
  combineReducers({...reducers, router}),
  initialState,
  compose(routerEnhancer, applyMiddleware(thunk, routerMiddleware)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body,
);
