import { createAction } from 'redux-actions';
import PARTICIPANT_UI_ACTION_TYPES from './participantsUIActionTypes';

const setSearchTerm = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_SEARCH_TERM, (searchTerm) => searchTerm);
const setSortData = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_SORT, (sortObj) => sortObj);
const setLimit = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_LIMIT, (limit) => limit);
const setPage = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_PAGE, (pageNumber) => pageNumber);
const setInitialPage = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_INITIAL_PAGE, (pageNumber) => pageNumber);
const setViewableFields = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_VIEWABLE_FIELDS, (fields) => fields);

export {
  setSearchTerm,
  setSortData,
  setLimit,
  setPage,
  setInitialPage,
  setViewableFields
};
