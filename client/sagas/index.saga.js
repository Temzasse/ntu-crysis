import { takeEvery } from 'redux-saga';
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


/* ***************************** WATCHERS *********************************** */
function* watchFetchWeatherData() {
  yield* takeEvery(types.WEATHER.FETCH, fetchWeatherData);
}

function* watchDebug() {
  yield* takeEvery(
    types.DEBUG, (action) => console.debug('REDUX DEBUG', action.payload)
  );
}
/* ***************************** /WATCHERS ********************************** */


export default function* root() {
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
}
