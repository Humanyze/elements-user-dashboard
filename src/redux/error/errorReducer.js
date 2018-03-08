import {handleActions} from 'redux-actions';
import ERROR_ACTION_TYPES from './errorActionTypes';

// returns undefined if no error, easy check for if error is present
const getCurrentError = (state) =>
    state.error.errors.reduce((highestPriorityError, error) => {
        return (
            (highestPriorityError && highestPriorityError.priority) >= (error && error.priority)
        ) ? highestPriorityError:error
    }, undefined);


export const initialState = {
    errors: []
};
const errorReducer = handleActions({
    [ERROR_ACTION_TYPES.ADD_ERROR]: (state, action) => ({
        ...state,
        errors: [...state.errors, action.payload]
    }),
    [ERROR_ACTION_TYPES.CLEAR_ERRORS]: (state, action) => ({
        ...state,
        errors: initialState.errors
    })
}, initialState);

export default errorReducer;

export {
    getCurrentError
}