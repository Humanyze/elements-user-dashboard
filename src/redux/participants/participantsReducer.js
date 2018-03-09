import { handleActions } from 'redux-actions';
import EQUIPMENT_ACTION_TYPES from './participantsActionTypes';

export const initialState = {
    requestPending  : false,
    participantIds  : [],
    participantsById: {}
};

const participantsReducer = handleActions({
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED]: (state, action) => ({
        requestPending: true
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS]  : (state, action) => ({
        requestPending  : false,
        participantsById: action.payload
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR]    : (state, action) => ({
        requestPending  : false,
        participantsById: initialState.participants
    })
}, initialState);


export const getAllParticipants = (state) => Object.values(state.participants.participantsById || {});

export default participantsReducer;