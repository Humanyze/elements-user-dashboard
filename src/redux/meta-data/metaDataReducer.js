import { handleActions } from 'redux-actions';

export const initialState = {
    appVersion: localStorage.getItem('HUMANYZE_GLOBAL_VERSION')
};

const metaDataReducer = handleActions({
}, initialState);


export const getAppVersion = state => state.metaData.appVersion;

export default metaDataReducer;