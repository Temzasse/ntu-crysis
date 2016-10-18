import { takeEvery, delay } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import { api, websocket as ws } from '../services';
import * as actions from '../actions/index.actions';
import * as types from '../actions/actiontypes';

// Constants
const TOAST_VISIBLE_TIME = 5000; // 5 seconds


/*
///////////
// TASKS //
///////////
*/

function* fetchWeatherData() {
  try {
    const data = yield call(api.fetchWeatherData);
    yield put(actions.receiveWeatherData(data));

    // Inform that the weather data has been updated
    yield put(actions.addMessage({
      type: 'info',
      content: 'Weather data updated',
    }));
  } catch (err) {
    yield put(actions.failWeatherData());
  }
}

/**
 * NOTE:
 * When toast message is added we want to remove it automatically
 * after x seconds
 *
 * TODO:
 * There's a small bug: if the user removes a message manually we don't cancel
 * the related unshift task. However, this bug is not that major so letting it
 * be for now... :P
 */
function* unshiftMessage() {
  yield delay(TOAST_VISIBLE_TIME);
  yield put(actions.removeMessage(0)); // from start of array
}


function* doLogin({ payload }) {
  yield delay(1000); // Simulate API call delay

  const { username } = payload;
  let mockUser = { username: 'Operator', role: 'operator' };

  // For testing the login with different roles
  if (username === 'operator') {
    mockUser = { username: 'Operator', role: 'operator' };
  }
  if (username === 'callcentre') {
    mockUser = { username: 'callcentre', role: 'callcentre' };
  }
  if (username === 'response') {
    mockUser = { username: 'response', role: 'response' };
  }
  yield put(actions.setUser(mockUser));
}

function* fetchIncidents() {
  yield delay(1000);
  ws.send({ type: types.INCIDENT.FETCH });
}


/*
//////////////
// WATCHERS //
//////////////
*/
function* watchFetchWeatherData() {
  yield* takeEvery(types.WEATHER.FETCH, fetchWeatherData);
}

function* watchAddMessage() {
  yield* takeEvery(types.MESSAGES.ADD, unshiftMessage);
}

function* watchDebug() {
  yield* takeEvery(
    types.DEBUG, (action) => console.debug('REDUX DEBUG', action.payload)
  );
}

function* watchFetchIncidents() {
  yield* takeEvery(types.INCIDENT.FETCH, fetchIncidents);
}

function* watchLogin() {
  yield* takeEvery(types.LOGIN, doLogin);
}


export default function* root() {
  yield fork(watchAddMessage);
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
  yield fork(watchLogin);
  yield fork(watchFetchIncidents);
}
