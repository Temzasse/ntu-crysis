import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index.reducer';
import rootSaga from '../sagas/index.saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // then run the saga
  sagaMiddleware.run(rootSaga);

  return store;
}
