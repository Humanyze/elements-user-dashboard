import {createAction} from 'redux-actions';
import {fetchWithAuth} from "../../rootReducer";
import USER_ACTION_TYPES from './userActionTypes';
import {mapUserResponse} from './userResponseMapper';

const userDataFetchRequested = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_REQUESTED);
const userDataFetchSuccessful = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL, userData => userData);
const userDataFetchFailed = createAction(USER_ACTION_TYPES.USER_DATA_FETCH_FAILED, error => error);


const setUserDataById = (id) => async (dispatch, getState) => {
    dispatch(userDataFetchRequested());
    try {
        //    get user data
        const bearerToken = getState().auth.tokenObj.access_token;
        const userRes= await fetchWithAuth(`/api/v1/user/${id}/`, bearerToken);
        const data = await userRes.json();
        const User = mapUserResponse(data);
        dispatch(userDataFetchSuccessful(User));
    } catch (e) {
        dispatch(userDataFetchFailed(e))
    }
};


export {
    setUserDataById,
    userDataFetchRequested,
    userDataFetchSuccessful,
    userDataFetchFailed
}
