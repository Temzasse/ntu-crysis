/* eslint-disable max-len */
import { createAction as ca } from 'redux-actions';
import * as types from './actiontypes';

function createAction(foo, bar) {
  const fun = ca(foo, bar);
  return (args) => {
    console.debug('CALLING ACTION', foo);
    return fun(args);
  };
}


// export const debug = createAction(types.DEBUG);

// ******************* GALLERY ************************/
export const fetchWeatherData = createAction(types.WEATHER.FETCH);
export const receiveWeatherData = createAction(types.WEATHER.RECEIVE);
export const failWeatherData = createAction(types.WEATHER.FAIL);

export const setSelectedIncident = createAction(types.INCIDENT.SET_SELECTED);
export const clearSelectedIncident = createAction(types.INCIDENT.CLEAR_SELECTED);
export const fetchIncidents = createAction(types.INCIDENT.FETCH);
export const receiveIncidents = createAction(types.INCIDENT.RECEIVE);

export const addMessage = createAction(types.MESSAGES.ADD);
export const removeMessage = createAction(types.MESSAGES.REMOVE);
export const doLogin = createAction(types.LOGIN);
export const doLogout = createAction(types.LOGOUT);

export const setUser = createAction(types.USER.SET);
export const clearUser = createAction(types.USER.CLEAR);

export const toggleMarkerVisibility = createAction(types.MAP.TOGGLE_MARKER);

export const startInit = createAction(types.INIT.START);
export const completeInit = createAction(types.INIT.COMPLETE);
export const errorInit = createAction(types.INIT.ERROR);
