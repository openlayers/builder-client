import fetch from 'isomorphic-fetch';
import group from './grouper';

const BUILDER_URL = 'http://localhost:4000'

export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const SET_DEFINES = 'SET_DEFINES';
export const EXPAND_ITEM = 'EXPAND_ITEM';

export function requestInfo(version) {
  return dispatch => {
    dispatch({type: REQUEST_INFO});
    fetch(BUILDER_URL + '/releases/' + version)
        .then(response => response.json())
        .then(json => dispatch(receiveInfo(json)));
  };
}

function createIndex(list) {
  const index = {};
  list.forEach((item, i) => index[item.name] = i);
  return index;
}

export function receiveInfo(info) {
  const symbols = info.symbols;
  const defines = info.defines;
  return {
    type: RECEIVE_INFO,
    info: {
      symbols,
      defines,
      groups: group(symbols),
      symbolsIndex: createIndex(symbols),
      definesIndex: createIndex(defines)
    }
  };
}

export function setSymbols(symbols) {
  return {
    type: SET_SYMBOLS,
    symbols: symbols
  };
}

export function setDefines(defines) {
  return {
    type: SET_DEFINES,
    defines: defines
  };
}

export function expandItem(name, expanded) {
  return {
    type: EXPAND_ITEM,
    name: name,
    expanded: expanded
  };
}
