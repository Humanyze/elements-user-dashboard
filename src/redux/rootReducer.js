import { combineReducers } from 'redux';
import authReducer from './common/auth/authReducer';
import languageReducer from './common/language/languageReducer';
import errorReducer from './common/error/errorReducer';
import modalReducer from './common/modal/modalReducer';
import userDataReducer from './common/userData/userDataReducer';
import AUTH_ACTION_TYPES from './common/auth/authActionTypes';
import groupUIReducer from './common/group-ui/groupUIReducer';
import metaDataReducer from './common/meta-data/metaDataReducer';
import filterUIReducer from './common/filter-ui/filterUIReducer';
import deploymentReducer from './common/deployment/deploymentReducer';
import metricReducer from 'Src/redux/common/metric/metricReducer';

const AppReducer = combineReducers({
  auth      : authReducer,
  metaData  : metaDataReducer,
  language  : languageReducer,
  error     : errorReducer,
  user      : userDataReducer,
  deployment: deploymentReducer,
  modal     : modalReducer,
  groupUI   : groupUIReducer,
  filterUI  : filterUIReducer,
  metric    : metricReducer
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