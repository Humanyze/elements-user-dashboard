import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import EQUIPMENT_ACTION_TYPES from './participantsActionTypes';
import { onNewPage } from 'Src/redux/participants-ui/participantsUIReducer';

export const initialState = {
    requestPending: false,
    participantIds: [],
    totalParticipantsCount: null,
    participantsById: {}
};

const participantsReducer = handleActions({
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS]: (state, action) => ({
        ...state,
        requestPending: false,
        participantsById: action.payload.participantsById,
        participantIds: action.payload.participantIds,
        totalParticipantsCount: action.payload.totalParticipantCount
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR]: (state, action) => ({
        ...state,
        requestPending: false,
        participantsById: initialState.participants
    })
}, initialState);


export const getParticipantsById = state => state.participants.participantsById;
export const getTotalParticipantsCount = state => state.participants.totalParticipantsCount;

export const getLoadedParticipantsLength = state => state.participants.participantIds.length;

export const isParticipantsFullyLoaded = createSelector(
    getTotalParticipantsCount,
    getLoadedParticipantsLength,
    (totalCount, loadedParticipantsLength) => totalCount === loadedParticipantsLength
);


export const showLoadingOnPageChange = createSelector(
    isParticipantsFullyLoaded,
    onNewPage,
    (fullyLoaded, onNewPage) => onNewPage && !fullyLoaded
);

export const getAllParticipants = createSelector(
    getParticipantsById,
    (participantsById) => Object.values(participantsById || {})
);

export const getParticipantSelectedById = id => createSelector(
    getParticipantsById,
    (participantsById) => participantsById[id]
);

export const getRequestPendingStatus = state => state.participants.requestPending;


// selectors for UI here to prevent circular dependency issue
export const getCurrentPageNumber = state => state.participantsUI.currentPageNumber;

export const getLimitPerPage = state => state.participantsUI.limitPerPage;


export const getTotalPageCount = createSelector(
    getLimitPerPage,
    getTotalParticipantsCount,
    (limitPerPage, totalParticipants) => Math.ceil((totalParticipants || 1)/limitPerPage)
);



export const getVisibleParticipants = createSelector(
    getCurrentPageNumber,
    getLimitPerPage,
    isParticipantsFullyLoaded,
    getAllParticipants,
    (pageNumber, limit, fullyLoaded, loadedParticipants) => {
        if (!fullyLoaded) return loadedParticipants;
        else {
           return loadedParticipants.slice((pageNumber - 1) * limit, pageNumber * limit);
        }
    }
);

export default participantsReducer;