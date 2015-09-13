import {combineReducers} from 'redux';

import {
  REQUEST_INFO, RECEIVE_INFO, SET_SYMBOLS, SET_DEFINES, EXPAND_ITEM,
  CREATE_JOB, RECEIVE_JOB_ID, RECEIVE_JOB_UPDATE
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
  case SET_SYMBOLS:
    var values = Object.assign({}, state, action.symbols);
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
  case SET_DEFINES:
    return Object.assign({}, state, action.defines);
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

function job(state = {}, action) {
  switch (action.type) {
  case CREATE_JOB:
    return {pending: true};
  case RECEIVE_JOB_ID:
    return Object.assign({id: action.id}, state);
  case RECEIVE_JOB_UPDATE:
    return {
      id: action.id,
      pending: action.pending,
      script: action.script
    };
  default:
    return state;
  }
}

export default combineReducers({
  info,
  build: combineReducers({symbols, defines}),
  expand,
  job
});
