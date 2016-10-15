import { combineReducers } from 'redux';
import * as types from '../actions/actiontypes';

/* eslint-disable max-len */
const mockIncidents = [
  { id: 1, title: 'Incident 1', description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.' },
  { id: 2, title: 'Incident 2', description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.' },
  { id: 3, title: 'Incident 3', description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.' },
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


const mapInitialState = {
  visibility: {
    weather: true,
    shelters: true,
  },
};
function controlMap(state = mapInitialState, action) {
  switch (action.type) {
  case types.MAP.TOGGLE_MARKER: {
    return {
      ...state,
      visibility: {
        [action.payload]: !!state.visibility[action.payload],
      },
    };
  }
  default:
    return state;
  }
}


const weatherInitialState = {
  forecast: [],
};
function weather(state = weatherInitialState, action) {
  switch (action.type) {
  case types.WEATHER.RECEIVE:
    return { ...state, forecast: [...action.payload] };
  default:
    return state;
  }
}

function messages(state = [], action) {
  switch (action.type) {
  case types.MESSAGES.ADD:
    return [...state, action.payload];
  case types.MESSAGES.REMOVE: {
    // Remove from specific index if payload (index in array) is defined
    // and is within the index range
    if (isFinite(action.payload) && state.length > action.payload) {
      // NOTE: we can't mutate old state => need to return new array
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    }
    return state;
  }
  default:
    return state;
  }
}
const userInitialState = {
  user: null,
  loggedIn: false,
};
function user(state = userInitialState, action) {
  switch (action.type) {
  case types.USER.SET:
    return { ...state, user: { ...action.payload }, loggedIn: true };
  case types.USER.CLEAR:
    return { ...userInitialState };
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
  controlMap,
  incident,
  weather,
  messages,
  user,
  loading,
  errors,
});

export default rootReducer;
