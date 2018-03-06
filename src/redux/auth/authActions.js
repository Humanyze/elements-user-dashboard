import {createAction} from 'redux-actions';
import AUTH_ACTION_TYPES from './authActionTypes';
import { getUserDataById } from '../userData/user/userActions';
import {postDataRequest} from "../rootReducer";

const logout = createAction(AUTH_ACTION_TYPES.LOGOUT);

const loginRequested = createAction(AUTH_ACTION_TYPES.LOGIN_REQUESTED);
const loginSuccessful = createAction(AUTH_ACTION_TYPES.LOGIN_SUCCESSFUL, authData => authData);
const loginFailed = createAction(AUTH_ACTION_TYPES.LOGIN_FAILED, error => error);

const loginUser = (username, password) => async (dispatch) => {
    dispatch(loginRequested());
    try {
        const res = await postDataRequest(`api/v1/login`, {username, password});
        const data = await res.json();
        console.log(data);
        dispatch(loginSuccessful(data));
        dispatch(getUserDataById(data.user_id));
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
}