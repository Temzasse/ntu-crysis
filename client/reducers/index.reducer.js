import { combineReducers } from 'redux';
import * as types from '../actions/actiontypes';

/* eslint-disable max-len */
const mockIncidents = [
  { id: 1, title: 'Incident 1', description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.' },
  { id: 2, title: 'Incident 2', description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.' },
];
/* eslint-enable max-len */

const incidentsInitialState = {
  all: [...mockIncidents],
  selected: null,
};

function incident(state = incidentsInitialState, action) {
  switch (action.type) {
  case types.INCIDENT.SET_SELECTED: {
    const selected = state.all.find(i => i.id === action.payload) || null;
    return { ...state, selected };
  }
  case types.INCIDENT.CLEAR_SELECTED:
    return { ...state, selected: null };
  default:
    return state;
  }
}


const loadingInitialState = {
  something: true,
};

function loading(state = loadingInitialState, action) {
  switch (action.type) {
  case types.SOMETHING.FETCH:
    return { ...state, something: true };
  case types.SOMETHING.RECEIVE:
    return { ...state, something: false };
  default:
    return state;
  }
}


const errorsInitialState = {
  something: false,
};

function errors(state = errorsInitialState, action) {
  switch (action.type) {
  case types.SOMETHING.FAIL:
    return { ...state, something: true };
  case types.ERRORS.CLEAR:
    return { ...errorsInitialState };
  default:
    return state;
  }
}


const rootReducer = combineReducers({
  incident,
  loading,
  errors,
});

export default rootReducer;
