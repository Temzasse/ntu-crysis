import { takeEvery, takeLatest, delay } from 'redux-saga';
// import { throttle } from 'redux-saga/recipes';
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
  yield put(actions.completeInit());
}

function* handleIncident({ payload }) {
  const incident = yield call(api.handleIncident, payload);
  yield put(actions.receiveIncidentUpdate(incident));
}

function* updateIncident({ payload }) {
  const { id, data } = payload;
  const incident = yield call(api.updateIncident, id, data);
  yield put(actions.receiveIncidentUpdate(incident));
}

function* fetchIncident({ payload }) {
  yield delay(1000);
  const incident = yield call(api.fetchIncident, payload);
  yield put(actions.receiveIncident(incident));
}

function* fetchResponseUnits() {
  const runits = yield call(api.fetchResponseUnits);
  yield put(actions.receiveResponseUnits(runits));
}

function* fetchResponseUnit({ payload }) {
  yield delay(1000);
  const runit = yield call(api.fetchResponseUnit, payload);
  yield put(actions.receiveResponseUnit(runit));
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
  yield delay(1000);

  /* eslint-disable max-len */
  const { Title } = payload;
  let mockIncident = { Title: 'Pikachu Breakout', Type: 'Land', Long: '1.30563255', Lat: '103.98444641', Area: 'Bukit Batok', Description: '' };

  // For testing the incident with titles
  if (Title === 'Onyx') {
    mockIncident = { Title: 'Onyx', Type: 'Land', Long: '1.31063255', Lat: '103.92444641', Area: 'Choa Chu Kang', Description: '' };
  }
  /* eslint-enable max-len */

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
function* watchFetchIncident() {
  yield takeLatest(types.INCIDENT.FETCH, fetchIncident);
}
function* watchFetchResponseUnits() {
  yield* takeEvery(types.RESPONSEUNIT.FETCH_ALL, fetchResponseUnits);
}
function* watchFetchResponseUnit() {
  yield* takeLatest(types.RESPONSEUNIT.FETCH, fetchResponseUnit);
}
function* watchFetchCurrentCrisis() {
  yield* takeEvery(types.CRISIS.FETCH_CURRENT, fetchCurrentCrisis);
}
function* watchHandleIncident() {
  yield* takeEvery(types.INCIDENT.HANDLE, handleIncident);
}
function* watchUpdateIncident() {
  yield* takeEvery(types.INCIDENT.UPDATE, updateIncident);
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
  yield fork(watchFetchIncident);
  yield fork(watchFetchCurrentCrisis);
  yield fork(watchUpdateIncident);
  yield fork(watchHandleIncident);
  yield fork(watchFetchResponseUnits);
  yield fork(watchFetchResponseUnit);
}
