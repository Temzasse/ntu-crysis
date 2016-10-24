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


function* fetchCurrentCrisis() {
  const crisis = yield call(api.getCurrentCrisis);
  yield put(actions.receiveCurrentCrisis(crisis));
}

function* initApp() {
  const user = yield call(api.getCurrentUser);

  if (user) { // Do auto login
    yield put(actions.setUser(user));
  }

  yield fetchCurrentCrisis();

  yield put(actions.completeInit());
}


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
  const userData = yield call(api.login, payload);

  if (userData) {
    yield put(actions.setUser(userData));
  } else { // NOTE: for development
    let mockUser = { username: 'Operator', role: 'operator' };

    // For testing the login with different roles
    if (payload.username === 'operator') {
      mockUser = { username: 'Operator 1', role: 'operator' };
    }
    if (payload.username === 'callcenter') {
      mockUser = { username: 'Call Center 1', role: 'callcenter' };
    }
    if (payload.username === 'response') {
      mockUser = { username: 'Response Unit 1', role: 'response' };
    }
    yield put(actions.setUser(mockUser));
  }
}


function* doLogout() {
  yield put(actions.clearUser());
  sessionStorage.removeItem('jwt-token');
}

function* doReportIncident({ payload }) {
  yield delay(1000); // Simulate API call delay

  const { Title } = payload;
  let mockIncident = { Title: 'Pikachu Breakout', Type: 'Land', Long: '1.30563255', Lat: '103.98444641', Area: 'Bukit Batok', Description: '' };

  // For testing the incident with titles
  if (Title === 'Onyx') {
    mockIncident = { Title: 'Onyx', Type: 'Land', Long: '1.31063255', Lat: '103.92444641', Area: 'Choa Chu Kang', Description: '' };
  }

  yield put(actions.CreateIncident(mockIncident));
}


function* fetchIncidents() {
  yield ws.send({ type: types.INCIDENTS.FETCH });
}


/*
//////////////
// WATCHERS //
//////////////
*/

function* watchInitApp() {
  yield* takeEvery(types.INIT.START, initApp);
}

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
  yield* takeEvery(types.INCIDENTS.FETCH, fetchIncidents);
}

function* watchFetchCurrentCrisis() {
  yield* takeEvery(types.CRISIS.FETCH_CURRENT, fetchCurrentCrisis);
}

function* watchLogin() {
  yield* takeEvery(types.LOGIN, doLogin);
}

function* watchLogout() {
  yield* takeEvery(types.LOGOUT, doLogout);
}

function* watchReportIncident() {
  yield* takeEvery(types.REPORTINCIDENT, doReportIncident);
}


export default function* root() {
  yield fork(watchInitApp);
  yield fork(watchAddMessage);
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchReportIncident);
  yield fork(watchFetchIncidents);
  yield fork(watchFetchCurrentCrisis);
}
