import { combineReducers } from 'redux';
import c from 'ElementstWebCommon';
console.error(c);
const { elementsRedux } = c;
const {
  authReducer,
  languageReducer,
  errorReducer,
  modalReducer,
  userDataReducer,
  AUTH_ACTION_TYPES,
  groupUIReducer,
  metaDataReducer,
  filterUIReducer,
  deploymentReducer,
  metricReducer,
} = elementsRedux;

const AppReducer = combineReducers({
  auth: authReducer,
  metaData: metaDataReducer,
  language: languageReducer,
  error: errorReducer,
  user: userDataReducer,
  deployment: deploymentReducer,
  modal: modalReducer,
  groupUI: groupUIReducer,
  filterUI: filterUIReducer,
  metric: metricReducer,
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
