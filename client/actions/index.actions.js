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
