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

// MAP
export const toggleMarkerVisibility = createAction(types.MAP.TOGGLE_MARKER);
export const fetchWeatherData = createAction(types.WEATHER.FETCH);
export const receiveWeatherData = createAction(types.WEATHER.RECEIVE);
export const failWeatherData = createAction(types.WEATHER.FAIL);

// INCIDENT
export const setSelectedIncident = createAction(types.INCIDENT.SET_SELECTED);
export const clearSelectedIncident = createAction(types.INCIDENT.CLEAR_SELECTED);
export const setActiveIncident = createAction(types.INCIDENT.SET_ACTIVE);
export const clearActiveIncident = createAction(types.INCIDENT.CLEAR_ACTIVE);
export const fetchIncident = createAction(types.INCIDENT.FETCH);
export const receiveIncident = createAction(types.INCIDENT.RECEIVE);
export const updateIncident = createAction(types.INCIDENT.UPDATE);
export const handleIncident = createAction(types.INCIDENT.HANDLE);
export const receiveIncidentUpdate = createAction(types.INCIDENT.UPDATE_RECEIVE);
// MULTIPLE INCIDENTS
export const fetchIncidents = createAction(types.INCIDENTS.FETCH);
export const receiveIncidents = createAction(types.INCIDENTS.RECEIVE);
// REPORTING
export const reportIncident = createAction(types.INCIDENT.REPORT);
export const addIncident = createAction(types.INCIDENT.ADD);

// CRISIS
export const fetchCurrentCrisis = createAction(types.CRISIS.FETCH_CURRENT);
export const receiveCurrentCrisis = createAction(types.CRISIS.RECEIVE_CURRENT);
export const archiveCurrentCrisis = createAction(types.CRISIS.ARCHIVE);
export const fetchAllCrises = createAction(types.CRISIS.FETCH_ALL);
export const receiveAllCrises = createAction(types.CRISIS.RECEIVE_ALL);

// RESPONSE UNIT
export const fetchResponseUnits = createAction(types.RESPONSEUNIT.FETCH_ALL);
export const receiveResponseUnits = createAction(types.RESPONSEUNIT.RECEIVE_ALL);
export const fetchResponseUnit = createAction(types.RESPONSEUNIT.FETCH);
export const receiveResponseUnit = createAction(types.RESPONSEUNIT.RECEIVE);

// MESSAGES
export const addMessage = createAction(types.MESSAGES.ADD);
export const removeMessage = createAction(types.MESSAGES.REMOVE);

// LOGIN
export const doLogin = createAction(types.LOGIN.START);
export const failLogin = createAction(types.LOGIN.FAIL);
export const doLogout = createAction(types.LOGOUT);
export const setUser = createAction(types.USER.SET);
export const clearUser = createAction(types.USER.CLEAR);

// INIT
export const startInit = createAction(types.INIT.START);
export const completeInit = createAction(types.INIT.COMPLETE);
export const errorInit = createAction(types.INIT.ERROR);

// ERROR MESSAGES
export const clearErrors = createAction(types.ERRORS.CLEAR);
