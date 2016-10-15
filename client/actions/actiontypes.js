/* eslint-disable max-len */
const fetchActions = ['FETCH', 'RECEIVE', 'FAIL'];
// const saveActions = ['SAVE', 'RESULT', 'FAIL'];
const binaryActions = ['SET', 'CLEAR'];
// const crudActions = [...binaryActions, 'ADD', 'UPDATE', 'REMOVE'];


function createTypes(base, actionsArray = fetchActions) {
  const res = {};
  actionsArray.forEach(type => {
    res[type] = `${base}_${type}`;
    return;
  });
  return res;
}

export const NAVIGATE = 'NAVIGATE';
export const LOAD_PAGE = 'LOAD_PAGE';
export const DEBUG = 'DEBUG';
export const LOGIN = 'LOGIN';
export const ERRORS = createTypes('ERROR', ['CLEAR']);

/* ---------- SOMETHING ---------- */
export const SOMETHING = createTypes('SOMETHING', [...fetchActions]);

export const INCIDENT = createTypes('INCIDENT', [...fetchActions, 'SET_SELECTED', 'CLEAR_SELECTED']);
export const WEATHER = createTypes('WEATHER', [...fetchActions]);
export const MESSAGES = createTypes('MESSAGES', ['ADD', 'REMOVE']);
export const USER = createTypes('USER', [...binaryActions]);
export const MAP = createTypes('MAP', ['TOGGLE_MARKER']);
