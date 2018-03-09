import { handleActions } from 'redux-actions';
import AUTH_ACTION_TYPES from './authActionTypes';

const getAuthErrorCode = (state) => state.auth.error;


export const initialState = JSON.parse(localStorage.getItem('reduxPersist:auth')) || {};

const authReducer = handleActions({
    [AUTH_ACTION_TYPES.LOGIN_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [AUTH_ACTION_TYPES.LOGIN_SUCCESSFUL]: (state, action) => ({
        ...state,
        error: null,
        requestPending: false,
        tokenObj: action.payload

    }),
    [AUTH_ACTION_TYPES.LOGIN_FAILED]: (state, action) => ({
        ...state,
        requestPending: false,
        error: action.payload
    }),
    [AUTH_ACTION_TYPES.LOGOUT]: (state, action) => ({})

}, initialState);

export default authReducer;



export {
    getAuthErrorCode
};