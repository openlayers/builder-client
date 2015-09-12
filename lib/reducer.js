import {combineReducers} from 'redux';

import {
  REQUEST_INFO, RECEIVE_INFO, SET_EXPORTS, SET_DEFINE, EXPAND_ITEM
} from './actions';

function info(state = {}, action) {
  switch (action.type) {
  case REQUEST_INFO:
    return {pending: true};
  case RECEIVE_INFO:
    return Object.assign({pending: false}, action.info);
  default:
    return state;
  }
}

function symbols(state = {}, action) {
  switch (action.type) {
  case SET_EXPORTS:
    var values = Object.assign({}, state, action.values);
    for (let name in values) {
      if (!values[name]) {
        // prune unexported symbols
        delete values[name];
      }
    }
    return values;
  default:
    return state;
  }
}

function defines(state = {}, action) {
  switch (action.type) {
  case SET_DEFINE:
    return Object.assign({}, state, {
      [action.name]: action.value
    });
  default:
    return state;
  }
}

function expand(state = {}, action) {
  switch (action.type) {
  case EXPAND_ITEM:
    return Object.assign({}, state, {
      [action.name]: action.expanded
    });
  default:
    return state;
  }
}

export default combineReducers({
  info,
  build: combineReducers({symbols, defines}),
  expand
});
