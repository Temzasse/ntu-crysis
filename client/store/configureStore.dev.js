import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers/index.reducer';
import rootSaga from '../sagas/index.saga';


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware, createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
);

export default function configureStore(initialState) {
  // mount it on the Store
  const store = createStore(rootReducer, initialState, enhancer);

  // then run the saga
  sagaMiddleware.run(rootSaga);

  return store;
}
