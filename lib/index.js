import 'babel-core/polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Builder from './components/builder';
import reducer from './reducer';
import {requestInfo} from './actions';

import './index.less';

const store = applyMiddleware(thunk)(createStore)(reducer);

export default React.createClass({

  propTypes: {
    version: React.PropTypes.string.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    store.dispatch(requestInfo(nextProps.version));
  },

  componentWillMount: function() {
    store.dispatch(requestInfo(this.props.version));
  },

  render: function() {
    return (
      <Provider store={store}>
        {() => <Builder/>}
      </Provider>
    );
  }

});
