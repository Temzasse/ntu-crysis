import { takeEvery, delay } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions/index.actions';
import * as types from '../actions/actiontypes';

// For mocking api call delays
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TOAST_VISIBLE_TIME = 5000; // 4 seconds

/* ***************************** TASKS *********************************** */
function* fetchWeatherData() {
  try {
    const data = yield call(api.fetchWeatherData);
    yield put(actions.receiveWeatherData(data));
    yield put(actions.addMessage({
      type: 'info',
      content: 'Weather data updated',
    }));

    // TODO: remove. Adding some test toasts.
    yield delay(3000);
    yield put(actions.addMessage({
      type: 'info',
      content: 'Test info toast BOOM!',
    }));
    yield delay(3000);
    yield put(actions.addMessage({
      type: 'error',
      content: 'Test error toast BOOM!',
    }));
    yield delay(2000);
    yield put(actions.addMessage({
      type: 'error',
      content: 'Another test error toast BOOM BOOM!',
    }));
    yield delay(2000);
    yield put(actions.addMessage({
      type: 'info',
      content: 'Last toast!',
    }));
  } catch (err) {
    yield put(actions.failWeatherData());
  }
}

/* NOTE:
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

/* ***************************** WATCHERS *********************************** */
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
/* ***************************** /WATCHERS ********************************** */


export default function* root() {
  yield fork(watchAddMessage);
  yield fork(watchFetchWeatherData);
  yield fork(watchDebug);
}
