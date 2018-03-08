import {createAction} from 'redux-actions';
import ERROR_ACTION_TYPES from './errorActionTypes';

const addError = createAction(ERROR_ACTION_TYPES.ADD_ERROR);
const clearErrors = createAction(ERROR_ACTION_TYPES.CLEAR_ERRORS);


export {
    addError,
    clearErrors
}