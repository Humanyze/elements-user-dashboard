import { handleActions } from 'redux-actions';
import AUTH_ACTION_TYPES from './authActionTypes';

export const initialState = JSON.parse(localStorage.getItem('reduxPersist:auth')) || {};

const authReducer = handleActions({
    [AUTH_ACTION_TYPES.LOGIN_REQUESTED]: (state, action) => ({
        ...state,
        requestingToken: true
    }),
    [AUTH_ACTION_TYPES.LOGIN_SUCCESSFUL]: (state, action) => ({
        ...state,
        errorMessage: null,
        requestingToken: false,
        tokenObj: action.payload

    }),
    [AUTH_ACTION_TYPES.LOGIN_FAILED]: (state, action) => ({
        ...state,
        requestingToken: false,
        errorMessage: action.payload
    }),
    [AUTH_ACTION_TYPES.LOGOUT]: (state, action) => ({})

}, initialState);

export default authReducer;

