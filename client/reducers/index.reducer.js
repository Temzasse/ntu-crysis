import { combineReducers } from 'redux';
import * as types from '../actions/actiontypes';

const loadingInitialState = {
  something: true,
};
function loading(state = loadingInitialState, action) {
  switch (action.type) {
  case types.SOMETHING.FETCH:
    return { ...state, something: true };
  case types.SOMETHING.RECEIVE:
    return { ...state, something: false };
  default:
    return state;
  }
}


const errorsInitialState = {
  something: false,
};
function errors(state = errorsInitialState, action) {
  switch (action.type) {
  case types.SOMETHING.FAIL:
    return { ...state, something: true };
  case types.ERRORS.CLEAR:
    return { ...errorsInitialState };
  default:
    return state;
  }
}


const rootReducer = combineReducers({
  loading,
  errors,
});

export default rootReducer;
