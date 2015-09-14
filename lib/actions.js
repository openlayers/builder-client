import fetch from 'isomorphic-fetch';
import util from 'openlayers-builder-util';
import {BUILDER_URL, jobStatus} from './common';
import group from './grouper';

export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const SET_DEFINES = 'SET_DEFINES';
export const EXPAND_ITEM = 'EXPAND_ITEM';
export const CREATE_JOB = 'CREATE_JOB';
export const RECEIVE_JOB = 'RECEIVE_JOB';
export const RESET_JOB = 'RESET_JOB';
export const SEARCH = 'SEARCH';

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
  };
}

export function setSymbols(symbols) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SYMBOLS,
      symbols: symbols
    });
    var state = getState();
    var longId = util.getLongId(state.build, state.info);
    dispatch(checkJob(longId));
    location.hash = '#' + longId;
  };
}

export function setDefines(defines) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_DEFINES,
      defines: defines
    });
    var state = getState();
    var longId = util.getLongId(state.build, state.info);
    dispatch(checkJob(longId));
    location.hash = '#' + longId;
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
    dispatch({
      type: CREATE_JOB,
      job: {status: jobStatus.PENDING}
    });

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
        .then(job => dispatch(receiveJob(job, info)));
  };
}

export function receiveJob(job, info) {
  return dispatch => {
    dispatch({type: RECEIVE_JOB, job: job});
    if (job.status === jobStatus.PENDING) {
      setTimeout(function() {
        dispatch(getJob(job, info));
      }, 2500);
    }
  };
}

function getJob(job, info) {
  return dispatch => {
    var url = BUILDER_URL + '/jobs/' + info.release.name + '/' + job.id;
    fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveJob(json, info)));
  };
}

function checkJob(longId) {
  return (dispatch, getState) => {
    dispatch({type: RESET_JOB});
    var state = getState();
    var url = BUILDER_URL + '/jobs/' + state.info.release.name + '/?longId=' + longId;
    fetch(url)
        .then(response => response.json())
        .then(jobs => {
          if (jobs.length === 1) {
            dispatch(receiveJob(jobs[0], state.info));
          }
        });
  }
}

export function search(name) {
  return (dispatch, getState) => {
    const baseName = name.split('#').shift();
    const expand = getState().expand;
    if (name !== baseName && !expand[baseName]) {
      dispatch(expandItem(baseName, true));
    }
    dispatch({type: SEARCH, name: name});
  }
}
