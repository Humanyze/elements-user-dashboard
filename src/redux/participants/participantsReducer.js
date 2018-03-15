import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import EQUIPMENT_ACTION_TYPES from './participantsActionTypes';


export const initialState = {
    requestPending       : false,
    participantIds       : [],
    totalParticipantsCount: null,
    participantsById     : {}
};

const participantsReducer = handleActions({
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS]  : (state, action) => ({
        ...state,
        requestPending  : false,
        participantsById: action.payload.participantsById,
        totalParticipantsCount: action.payload.totalParticipantCount
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR]    : (state, action) => ({
        ...state,
        requestPending  : false,
        participantsById: initialState.participants
    })
}, initialState);



export const getParticipantsById = state => state.participants.participantsById;

export const getAllParticipants = createSelector(
    getParticipantsById,
    (participantsById) => Object.values(participantsById || {})
);

export const getParticipantSelectedById = id => createSelector(
    getParticipantsById,
    (participantsById) => participantsById[id]
);

export const getTotalParticipantsCount = state => state.participants.totalParticipantsCount;

export const getRequestPendingStatus = state => state.participants.requestPending;

export default participantsReducer;