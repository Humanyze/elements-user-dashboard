import { createAction } from 'redux-actions';
import AUTH_ACTION_TYPES from './authActionTypes';
import { setUserDataById } from '../userData/user/userActions';
import { setParticipantDataById } from '../userData/participant/participantActions';
import AxiosRequestService from '../AxiosRequestService';

const logout = createAction(AUTH_ACTION_TYPES.LOGOUT);

const loginRequested = createAction(AUTH_ACTION_TYPES.LOGIN_REQUESTED);
const loginSuccessful = createAction(AUTH_ACTION_TYPES.LOGIN_SUCCESSFUL, authData => authData);
const loginFailed = createAction(AUTH_ACTION_TYPES.LOGIN_FAILED, error => error);

const loginUser = (username, password) => async (dispatch) => {
    dispatch(loginRequested());
    try {
        const { data } = await AxiosRequestService.auth.login({ username, password });
        dispatch(loginSuccessful(data));
        dispatch(setUserDataById(data.user_id));
        dispatch(setParticipantDataById(data.user_id));
    } catch (e) {
        dispatch(loginFailed(e));
    }
};


export {
    loginUser,
    loginRequested,
    loginSuccessful,
    loginFailed,
    logout
};