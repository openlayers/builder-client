import {combineReducers} from 'redux';

import actions from './actions';

/**

Info:

{
  symbols: Array.<Symbol>,
  defines: Array.<Define>,
  symbolIndex: {name -> index},
  definesIndex: {name -> index},
  groups: Array.<Group>
}

Symbol:

{
  name: string,
  description: string,
  kind: 'function|class|member',
  stability: 'experimental|stable'
}

Define:

{
  name: string,
  description: string,
  default: boolean
}

Class:

{
  name: string,
  description: string,
  methods: Array.<Symbol>
}

Group:

{
  name: string,
  description: string,
  classes: Array.<Class>,
  functions: Array.<Symbol>
}

State:

{
  info: Info,
  exports: {symbolName -> boolean},
  defines: {defineName -> boolean},
  expand: {name -> boolean}
}

 */

function info(state = {}, action) {
  switch (action.type) {
  case actions.REQUEST_INFO:
    return {
      pending: true,
      symbols: [],
      defines: []
    };
  case actions.RECEIVE_INFO:
    return {
      pending: false,
      symbols: action.info.symbols,
      defines: action.info.defines
    };
  default:
    return state;
  }
}

function exports(state = {}, action) {
  switch (action.type) {
  case actions.SET_EXPORT:
    return Object.assign({}, state, {
      [action.name]: action.value
    });
  default:
    return state;
  }
}

function defines(state = {}, action) {
  switch (action.type) {
  case actions.SET_DEFINE:
    return Object.assign({}, state, {
      [action.name]: action.value
    });
  default:
    return state;
  }
}

function expand(state = {}, action) {
  switch (action.type) {
  case actions.EXPAND_ITEM:
    return Object.assign({}, state, {
      [action.name]: action.expanded
    });
  default:
    return state;
  }
}

export default combineReducers({
  info,
  exports,
  defines,
  expand
});
