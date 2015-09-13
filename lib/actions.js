import fetch from 'isomorphic-fetch';
import util from 'openlayers-builder-util';
import group from './grouper';

const BUILDER_URL = 'http://localhost:4000'

export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const SET_DEFINES = 'SET_DEFINES';
export const EXPAND_ITEM = 'EXPAND_ITEM';
export const CREATE_JOB = 'CREATE_JOB';
export const RECEIVE_JOB_ID = 'RECEIVE_JOB_ID';
export const RECEIVE_JOB_UPDATE = 'RECEIVE_JOB_UPDATE';

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
  return dispatch => {
    // check to see if there is a valid long id in the hash
    var id = location.hash.substring(1);
    if (id) {
      var build;
      try {
        build = util.configForLongId(id, info);
      } catch (err) {
        location.hash = '';
      }
      if (build) {
        dispatch(setSymbols(build.symbols));
        dispatch(setDefines(build.defines));
      }
    }

    dispatch({
      type: RECEIVE_INFO,
      info: {
        symbols: info.symbols,
        defines: info.defines,
        release: info.release,
        groups: group(info.symbols),
        symbolsIndex: createIndex(info.symbols),
        definesIndex: createIndex(info.defines)
      }
    });
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

export function createJob(build, info) {
  return dispatch => {
    dispatch({type: CREATE_JOB});

    var url = BUILDER_URL + '/jobs/' + info.release.name + '/';

    const config = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(build)
    };

    fetch(url, config)
        .then(response => response.json())
        .then(json => dispatch(receiveJobId(json.id, info)));
  };
}

export function receiveJobId(id, info) {
  return dispatch => {
    dispatch({type: RECEIVE_JOB_ID, id: id});
    dispatch(getJobUpdate(id, info));
  };
}

function getJobUpdate(id, info) {
  return dispatch => {
    var url = BUILDER_URL + '/jobs/' + info.release.name + '/' + id;
    fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveJobUpdate(id, json, info)));
  };
}

export function receiveJobUpdate(id, job, info) {
  return dispatch => {
    var pending = job.status === 'pending';
    dispatch({
      type: RECEIVE_JOB_UPDATE,
      id: id,
      pending: pending,
      script: job.script
    });
    if (pending) {
      setTimeout(function() {
        dispatch(getJobUpdate(id, info));
      }, 2500);
    }
  };
}
