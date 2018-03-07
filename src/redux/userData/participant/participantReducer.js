import { handleActions } from 'redux-actions';
import PARTICIPANT_ACTION_TYPES from './participantActionTypes';


export const initialState = {
    participantData: null,
    fetching: false
};

const participantReducer = handleActions({
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_REQUESTED]: (state, action) => ({
        ...state,
        fetching: true
    }),
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        participantData: action.payload,
        fetching: false
    }),
    [PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_FAILED]: (state, action) => ({
        ...state,
        fetching: false
    })
}, initialState);


export default participantReducer;