import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import errorReducer from './error/errorReducer';
import modalReducer from './modal/modalReducer';
import participantsReducer from './participants/participantsReducer';
import participantsUIReducer from './participants-ui/participantsUIReducer';
import userDataReducer from './userData/userDataReducer';
import deploymentReducer from './deployment/deploymentReducer';
import AUTH_ACTION_TYPES from './auth/authActionTypes';

const AppReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    user: userDataReducer,
    modal: modalReducer,
    deployment: deploymentReducer,
    // note: I want UI to be a field of participants, but I believe
    // note: that breaks some aspects of redux in terms of diffing productively
    participants: participantsReducer,
    participantsUI: participantsUIReducer
});

const RootReducer = (state, action) => {
    if (action.type === AUTH_ACTION_TYPES.LOGOUT) {
        state = undefined;
    }
    return AppReducer(state, action);
};


export default RootReducer;


// temporary services
export const postDataRequest = async (url, data) => await fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
});


export const fetchWithAuth = async (url, token) =>
    await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });