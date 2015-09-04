import 'babel-core/polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = applyMiddleware(thunk)(createStore)(reducer);

export default React.createClass({

  _render: function() {
    // TODO: render symbol groups and defines
  },

  render: function() {
    return (
      <Provider store={store}>
        {this._render}
      </Provider>
    );
  }

});
