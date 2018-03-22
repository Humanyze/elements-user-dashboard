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
    // note: that breaks some aspects of redux in terms of diffing productively,
    // note: for now, we'll follow this pattern, as ultimately the UI for the participantsTable should be separate from the actual participant data that is fetched
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