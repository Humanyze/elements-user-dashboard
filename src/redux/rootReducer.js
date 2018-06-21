import { combineReducers } from 'redux';
import authReducer from './common/auth/authReducer';
import languageReducer from './common/language/languageReducer';
import errorReducer from './common/error/errorReducer';
import modalReducer from './common/modal/modalReducer';
import participantsReducer from './participants/participantsReducer';
import participantsUIReducer from './participants-ui/participantsUIReducer';
import userDataReducer from './common/userData/userDataReducer';
import deploymentReducer from './deployment/deploymentReducer';
import AUTH_ACTION_TYPES from './common/auth/authActionTypes';
import metaDataReducer from './common/meta-data/metaDataReducer';

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
        // eslint-disable-next-line no-param-reassign
        state = undefined;
        window.localStorage.clear();
    }
    return AppReducer(state, action);
};

export default RootReducer;