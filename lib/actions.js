import fetch from 'isomorphic-fetch';
import util from 'openlayers-builder-util';
import {BUILDER_URL, jobStatus} from './common';
import groupAndIndex from './grouper';

export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const GROUP_AND_INDEX = 'GROUP_AND_INDEX';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const SET_DEFINES = 'SET_DEFINES';
export const CREATE_JOB = 'CREATE_JOB';
export const RECEIVE_JOB = 'RECEIVE_JOB';
export const RESET_JOB = 'RESET_JOB';
export const SELECT = 'SELECT';

export function requestInfo(version) {
  return dispatch => {
    dispatch({type: REQUEST_INFO});
    fetch(BUILDER_URL + '/releases/' + version)
        .then(response => response.json())
        .then(json => dispatch(receiveInfo(json)));
  };
}

export function createGroups(info) {
  const {groups, index} = groupAndIndex(info);
  return {
    type: GROUP_AND_INDEX,
    groups,
    index
  };
}

export function receiveInfo(info) {
  return dispatch => {
    dispatch(createGroups(info));
    dispatch({
      type: RECEIVE_INFO,
      info: info
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

export function select(name) {
  return {
    type: SELECT,
    name: name
  };
}
