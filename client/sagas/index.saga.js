import { takeEvery } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions/index.actions';
import * as types from '../actions/actiontypes';

// For mocking api call delays
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* ***************************** TASKS *********************************** */
function* fetchSomething({ payload }) {
  console.debug('====> fetchSomething payload', payload);
  try {
    const something = yield call(api.getSomething, 'something');
    console.log(something);
    // yield put(actions.receiveSomething(something));
  } catch (err) {
    yield put(actions.failSomething());
  }
}


/* ***************************** WATCHERS *********************************** */
function* watchFetchSomething() {
  yield* takeEvery(types.SOMETHING.FETCH, fetchSomething);
}

function* watchDebug() {
  yield* takeEvery(
    types.DEBUG, (action) => console.debug('REDUX DEBUG', action.payload)
  );
}
/* ***************************** /WATCHERS ********************************** */


export default function* root() {
  yield fork(watchFetchSomething);
  yield fork(watchDebug);
}
