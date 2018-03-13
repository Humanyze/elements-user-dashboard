import { createAction } from 'redux-actions';
import PARTICIPANT_UI_ACTION_TYPES from './participantsUIActionTypes';

const setSearchTerm = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_SEARCH_TERM, searchTerm => searchTerm);
const setSortData = createAction(PARTICIPANT_UI_ACTION_TYPES.SET_SORT, sortObj => sortObj);

export {

};