import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import PARTICIPANT_UI_ACTION_TYPES from './participantsUIActionTypes';
import { getTotalParticipantsCount } from 'Redux/participants/participantsReducer';


export const initialState = {
    limitPerPage     : 20,
    currentPageNumber: 1
};


const participantsUIReducer = handleActions({
    [PARTICIPANT_UI_ACTION_TYPES.SET_LIMIT]: (state, action) => ({
        ...state,
        limitPerPage: action.payload
    }),
    [PARTICIPANT_UI_ACTION_TYPES.SET_PAGE]: (state, action) => ({
        ...state,
        currentPageNumber: action.payload
    }),
}, initialState);


export const getCurrentPageNumber = state => state.participantsUI.currentPageNumber;
export const getLimitPerPage = state => state.participantsUI.limitPerPage;
export const getTotalPageCount = createSelector(
    getLimitPerPage,
    getTotalParticipantsCount,
    (limitPerPage, totalParticipants) => Math.ceil((totalParticipants || 1)/limitPerPage)
);

export default participantsUIReducer;