import { takeEvery, takeLatest, delay } from 'redux-saga';
// import { throttle } from 'redux-saga/recipes';
import { put, call, fork, select } from 'redux-saga/effects';
import { api, websocket as ws } from '../services';
import * as actions from '../actions/index.actions';
import * as types from '../actions/actiontypes';
import { getCurrentCrisis } from '../selectors';

// Constants
const TOAST_VISIBLE_TIME = 5000; // 5 seconds


/*
/////////////
// HELPERS //
/////////////
*/
function* handleApiErrors({ body }) {
  if (!body) console.log('Uknown API error');

  // TODO: move these types to action types file
  switch (body.error) {
  case 'LOGIN_INVALID_CREDENTIALS': {
    yield put(actions.failLogin());
    // yield delay(3000);
    // yield put(actions.clearErrors());
    break;
  }
  default:
    console.log(`Error ${body.error}`);
  }
}


/*
///////////
// TASKS //
///////////
*/


function* initApp() {
  const user = yield call(api.getCurrentUser);
  if (user) { // Do auto login
    yield put(actions.setUser(user));
  }
  yield put(actions.completeInit());
}

function* fetchCurrentCrisis() {
  const crisis = yield call(api.getCurrentCrisis);
  yield put(actions.receiveCurrentCrisis(crisis));
}

function* fetchAllCrises() {
  const crises = yield call(api.getCrises);
  yield put(actions.receiveAllCrises(crises));
}

function* archiveCrisis() {
  const current = yield select(getCurrentCrisis);
  current.status = 'ARC';
  const archivedCrisis = yield call(api.updateCrisis, current.id, current);
  console.debug('====> archivedCrisis', archivedCrisis);
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

function* addIncident({ payload }) {
  const newIncident = yield call(api.addIncident, payload);
  console.debug('====> newIncident', newIncident);
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
  try {
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
  } catch (e) {
    yield handleApiErrors(e);
  }
}


function* doLogout() {
  yield put(actions.clearUser());
  sessionStorage.removeItem('jwt-token');
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
function* watchArchiveCrisis() {
  yield* takeEvery(types.CRISIS.ARCHIVE, archiveCrisis);
}
function* watchFetchCrises() {
  yield* takeEvery(types.CRISIS.FETCH_ALL, fetchAllCrises);
}
function* watchAddIncident() {
  yield* takeEvery(types.INCIDENT.ADD, addIncident);
}
function* watchLogin() {
  yield* takeEvery(types.LOGIN.START, doLogin);
}
function* watchLogout() {
  yield* takeEvery(types.LOGOUT, doLogout);
}


export default function* root() {
  yield fork(watchInitApp);
  yield fork(watchAddMessage);
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchAddIncident);
  yield fork(watchFetchIncidents);
  yield fork(watchFetchIncident);
  yield fork(watchFetchCurrentCrisis);
  yield fork(watchUpdateIncident);
  yield fork(watchHandleIncident);
  yield fork(watchFetchResponseUnits);
  yield fork(watchFetchResponseUnit);
  yield fork(watchArchiveCrisis);
  yield fork(watchFetchCrises);
}
