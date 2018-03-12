import { handleActions } from 'redux-actions';
import PARTICIPANT_ACTION_TYPES from './participantActionTypes';

const getCurrentParticipantAvatar = state => state.user.participant.avatar;


export {
    getCurrentParticipantAvatar
};

export const initialState = {
    participantData: null,
    requestPending: false
};

const participantReducer = handleActions({
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        participantData: action.payload,
        requestPending: false
    }),
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_FAILED]: (state, action) => ({
        ...state,
        requestPending: false
    })
}, initialState);


export default participantReducer;