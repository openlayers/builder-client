import 'babel-core/polyfill';
import React from 'react';
import {Provider} from 'react-redux';

import App from './containers/app';
import configureStore from './store/configure-store';

const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App/>}
  </Provider>,
  document.getElementById('root')
);
