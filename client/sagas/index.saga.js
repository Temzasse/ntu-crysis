import { takeEvery, delay } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions/index.actions';
import * as types from '../actions/actiontypes';

// For mocking api call delays
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* ***************************** TASKS *********************************** */
function* fetchWeatherData() {
  try {
    const data = yield call(api.fetchWeatherData);
    yield put(actions.receiveWeatherData(data));
    yield put(actions.addMessage({
      type: 'info',
      content: 'Weather data updated',
    }));
  } catch (err) {
    yield put(actions.failSomething());
  }
}

function* doLogin({ payload }) {
  yield delay(1000);
  console.log('------->', payload);
  const { username } = payload;
  let mockUser = {
    username: 'Operator',
    role: 'operator',
  };

  // For testing the login with different roles
  if (username === 'operator') {
    mockUser = {
      username: 'Operator',
      role: 'operator',
    };
  }
  if (username === 'callcenter') {
    mockUser = {
      username: 'callcenter',
      role: 'callcenter',
    };
  }
  if (username === 'response') {
    mockUser = {
      username: 'response',
      role: 'response',
    };
  }
  yield put(actions.setUser(mockUser));
}

/* ***************************** WATCHERS *********************************** */
function* watchFetchWeatherData() {
  yield* takeEvery(types.WEATHER.FETCH, fetchWeatherData);
}

function* watchDebug() {
  yield* takeEvery(
    types.DEBUG, (action) => console.debug('REDUX DEBUG', action.payload)
  );
}

function* watchLogin() {
  yield* takeEvery(types.LOGIN, doLogin);
}

/* ***************************** /WATCHERS ********************************** */


export default function* root() {
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
  yield fork(watchLogin);
}
