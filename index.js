import React from 'react';
import ReactDOM from 'react-dom';

import App from './lib/index';

const scripts = document.getElementsByTagName('script');
const dataset = scripts[scripts.length - 1].dataset;

ReactDOM.render(
  <App version={dataset.version}/>,
  document.getElementById('root')
);
