import {handleActions} from 'redux-actions';
import EQUIPMENT_ACTION_TYPES from './participantsActionTypes';

export const initialState = {
    fetching: false,
    participantsById: {

    }
};

const participantsReducer = handleActions({
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED]: (state, action) => ({
        fetching: true
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS]: (state, action) => ({
        fetching: false,
        participantsById: action.payload
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR]: (state, action) => ({
        fetching: false,
        participantsById: initialState.participants
    //    set some sort of error message somewhere
    })

}, initialState);


export const getAllParticipants = (state) => Object.values(state.participants.participantsById || {});

export default participantsReducer;