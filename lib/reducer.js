import {combineReducers} from 'redux';

import {
  GROUP_AND_INDEX, REQUEST_INFO, RECEIVE_INFO, SET_SYMBOLS, SET_DEFINES,
  CREATE_JOB, RECEIVE_JOB, RESET_JOB, SELECT
} from './actions';

function groups(state = [], action) {
  switch (action.type) {
  case GROUP_AND_INDEX:
    return action.groups;
  default:
    return state;
  }
}

function index(state = {}, action) {
  switch (action.type) {
  case GROUP_AND_INDEX:
    return action.index;
  default:
    return state;
  }
}

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

function job(state = {}, action) {
  switch (action.type) {
  case CREATE_JOB:
  case RECEIVE_JOB:
    return action.job;
  case RESET_JOB:
    return {};
  default:
    return state;
  }
}

function selected(state = '', action) {
  switch (action.type) {
  case SELECT:
    return action.name;
  default:
    return state;
  }
}

export default combineReducers({
  info,
  groups,
  index,
  build: combineReducers({symbols, defines}),
  job,
  selected
});
