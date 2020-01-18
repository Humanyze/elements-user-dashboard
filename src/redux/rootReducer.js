import { combineReducers } from 'redux';
import { elementsRedux } from 'ElementsWebCommon';
import participantsUIReducer from './participants-ui/participantsUIReducer';
import participantsReducer from './participants/participantsReducer';

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
  companyReducer,
  colorReducer,
} = elementsRedux;


const AppReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  metaData: metaDataReducer,
  error: errorReducer,
  user: userDataReducer,
  modal: modalReducer,
  deployment: deploymentReducer,
  groupUI: groupUIReducer,
  company: companyReducer,
  filterUI: filterUIReducer,
  participants: participantsReducer,
  participantsUI: participantsUIReducer,
  color: colorReducer,
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
