import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import languageReducer from './language/languageReducer';
import errorReducer from './error/errorReducer';
import modalReducer from './modal/modalReducer';
import participantsReducer from './participants/participantsReducer';
import participantsUIReducer from './participants-ui/participantsUIReducer';
import userDataReducer from './userData/userDataReducer';
import deploymentReducer from './deployment/deploymentReducer';
import AUTH_ACTION_TYPES from './auth/authActionTypes';
import metaDataReducer from './meta-data/metaDataReducer';

const AppReducer = combineReducers({
    auth: authReducer,
    language: languageReducer,
    metaData: metaDataReducer,
    error: errorReducer,
    user: userDataReducer,
    modal: modalReducer,
    deployment: deploymentReducer,
    participants: participantsReducer,
    participantsUI: participantsUIReducer
});

const RootReducer = (state, action) => {
    if (action.type === AUTH_ACTION_TYPES.LOGOUT) {
        // note: for clearing state after logging out
        state = undefined;
        window.localStorage.clear();
    }
    return AppReducer(state, action);
};

export default RootReducer;