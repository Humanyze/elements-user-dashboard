import { handleActions } from 'redux-actions';
import AUTH_ACTION_TYPES from './authActionTypes';


const defaultState = {
    error: null,
    requestPending: false,
    authInfo: null
};

const searchLocalAuth = () => {
    const emberAuth = JSON.parse(localStorage.getItem('ember_simple_auth-session'));
    const authenticated = emberAuth && emberAuth.authenticated;
    if (!!authenticated) {
        return {
            ...defaultState,
            authInfo: authenticated
        };
    }
    return JSON.parse(localStorage.getItem('reduxPersist:auth'));
};

export const initialState = searchLocalAuth() || defaultState;

const authReducer = handleActions({
    [AUTH_ACTION_TYPES.LOGIN_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [AUTH_ACTION_TYPES.LOGIN_SUCCESSFUL]: (state, action) => ({
        ...state,
        error: null,
        requestPending: false,
        authInfo: action.payload

    }),
    [AUTH_ACTION_TYPES.LOGIN_FAILED]: (state, action) => ({
        ...state,
        requestPending: false,
        error: action.payload
    }),
    [AUTH_ACTION_TYPES.LOGOUT]: (state, action) => ({})

}, initialState);

export default authReducer;


const getAuthInfo = state => state.auth.authInfo;

const isUserAuthenticated = (state) => !!state.auth.authInfo;

const getBearerToken = (state) => state.auth.authInfo && state.auth.authInfo.access_token;

const getAuthErrorCode = (state) => state.auth.error;



export {
    getAuthInfo,
    isUserAuthenticated,
    getBearerToken,
    getAuthErrorCode
};
