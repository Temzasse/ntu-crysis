import { combineReducers } from 'redux';
import * as types from '../actions/actiontypes';

// Import constants and dummy data
import {
  mockIncidents,
  shelterMarkers,
  mapSectors,
} from '../static/dummyData';


/*
//////////////
// REDUCERS //
//////////////
*/

const appInitInitialState = {
  complete: false,
};
function appInit(state = appInitInitialState, action) {
  switch (action.type) {
  case types.INIT.COMPLETE: {
    return { ...state, complete: true };
  }
  default:
    return state;
  }
}

const incidentsInitialState = {
  // all: [...mockIncidents],
  all: [],
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
  case types.INCIDENTS.RECEIVE:
    return { ...state, all: [...action.payload] };
  default:
    return state;
  }
}


const mapInitialState = {
  visibility: {
    weather: true,
    shelters: true,
  },
  sectors: [...mapSectors], // sectors are pre-defined
  markers: {
    shelters: [...shelterMarkers], // shelters are pre-defined
  },
};
function controlMap(state = mapInitialState, action) {
  switch (action.type) {
  case types.MAP.TOGGLE_MARKER: {
    return {
      ...state,
      visibility: {
        [action.payload]: !state.visibility[action.payload],
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
  weather: false,
};

function loading(state = loadingInitialState, action) {
  switch (action.type) {
  case types.WEATHER.FETCH:
    return { ...state, weather: true };
  case types.WEATHER.RECEIVE:
    return { ...state, weather: false };
  default:
    return state;
  }
}


const errorsInitialState = {
  weather: false,
};

function errors(state = errorsInitialState, action) {
  switch (action.type) {
  case types.WEATHER.FAIL:
    return { ...state, weather: true };
  case types.ERRORS.CLEAR:
    return { ...errorsInitialState };
  default:
    return state;
  }
}


const rootReducer = combineReducers({
  appInit,
  controlMap,
  incident,
  weather,
  messages,
  user,
  loading,
  errors,
});

export default rootReducer;
