import { handleActions } from 'redux-actions';
import USER_ACTION_TYPES from './userActionTypes';
import AUTH_ACTION_TYPES from 'Redux/auth/authActionTypes';


const getCurrentUser = (state) => state.user.user.user;
const getCurrentUserName = (state) => getCurrentUser(state) && getCurrentUser(state).username;


export {
    getCurrentUser,
    getCurrentUserName
};

export const initialState = {
    requestPending: false,
    user: null
};

const userReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        user: action.payload,
        requestPending: false
    }),
    [USER_ACTION_TYPES.USER_DATA_FETCH_FAILED]: (state, action) => ({
        ...state,
        requestPending: false
    }),
    [AUTH_ACTION_TYPES.LOGOUT]: (state, action) => initialState
}, initialState);


export default userReducer;
