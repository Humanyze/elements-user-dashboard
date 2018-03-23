import { createAction } from 'redux-actions';
import AxiosRequestService from '../../AxiosRequestService';
import USER_ACTION_TYPES from './userActionTypes';
import { mapUserResponse } from './userResponseMapper';
import { getBearerToken } from '../../auth/authReducer';

const userDataFetchRequested = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_REQUESTED);
const userDataFetchSuccessful = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL, userData => userData);
const userDataFetchFailed = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_FAILED, error => error);


const setUserDataById = (id) => async (dispatch, getState) => {
    dispatch(userDataFetchRequested());
    try {
        //    get user data
        const bearerToken = getBearerToken(getState());
        const { data } = await AxiosRequestService.user.getUserById(id, bearerToken);
        const User = mapUserResponse(data);
        dispatch(userDataFetchSuccessful(User));
    } catch (e) {
        dispatch(userDataFetchFailed(e));
        // this should probably log user out after showing error page
    }
};


export {
    setUserDataById,
    userDataFetchRequested,
    userDataFetchSuccessful,
    userDataFetchFailed
};




