import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import PARTICIPANT_UI_ACTION_TYPES from './participantsUIActionTypes';
import { orderedRequiredFields } from '../participants/participantDataSetEpic';
export const initialState = {
  limitPerPage: 20,
  currentPageNumber: 1,
  initialPageNumber: 1,
  viewableKeys: orderedRequiredFields,
};


const participantsUIReducer = handleActions({
  [PARTICIPANT_UI_ACTION_TYPES.SET_LIMIT]: (state, action) => ({
    ...state,
    limitPerPage: action.payload,
  }),
  [PARTICIPANT_UI_ACTION_TYPES.SET_PAGE]: (state, action) => ({
    ...state,
    currentPageNumber: action.payload,
  }),
  [PARTICIPANT_UI_ACTION_TYPES.SET_INITIAL_PAGE]: (state, action) => ({
    ...state,
    currentPageNumber: action.payload,
    initialPageNumber: action.payload,
  }),
  [PARTICIPANT_UI_ACTION_TYPES.SET_VIEWABLE_FIELDS]: (state, action) => ({
    ...state,
    viewableKeys: action.payload,
  }),
}, initialState);


export const getViewableParticipantKeys = (state) => state.participantsUI.viewableKeys;

export const getFormattedHeaders = createSelector(
  getViewableParticipantKeys,
  (viewableKeys) => viewableKeys.map((key) => key.replace(/_/g, ' '))
);

export const getCurrentPageNumber = (state) => state.participantsUI.currentPageNumber;
export const getInitialPageNumber = (state) => state.participantsUI.initialPageNumber;

export const onNewPage = createSelector(
  getCurrentPageNumber,
  getInitialPageNumber,
  (currentPage, initialPage) => currentPage !== initialPage
);


export default participantsUIReducer;
