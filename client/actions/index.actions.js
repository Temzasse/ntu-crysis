/* eslint-disable max-len */
import { createAction as ca } from 'redux-actions';
import * as types from './actiontypes';

function createAction(foo, bar) {
  const fun = ca(foo, bar);
  return (args) => {
    console.debug('CALLING ACTION', foo);
    return fun(args);
  };
}


// export const debug = createAction(types.DEBUG);

// ******************* GALLERY ************************/
export const fetchSomething = createAction(types.SOMETHING.FETCH);
export const receiveSomething = createAction(types.SOMETHING.RECEIVE);
export const failSomething = createAction(types.SOMETHING.FAIL);
