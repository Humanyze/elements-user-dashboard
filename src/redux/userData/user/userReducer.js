import { handleActions } from 'redux-actions';
import USER_ACTION_TYPES from './userActionTypes';


export const initialState = {
    fetching: false,
    user: null
};

const userReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_REQUESTED]: (state, action) => ({
        ...state,
        fetching: true
    }),
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state
    }),
    [USER_ACTION_TYPES.USER_DATA_FETCH_FAILED]: (state, action) => ({
        ...state
    })
}, initialState);


export default userReducer;