import {handleActions} from 'redux-actions';
import EQUIPMENT_ACTION_TYPES from './participantsActionTypes';

export const initialState = {
    fetching: false,
    participants: []
};

const participantsReducer = handleActions({
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED]: (state, action) => ({
        fetching: true
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS]: (state, action) => ({
        fetching: false,
        participants: action.payload.sort(() => .5 - Math.random()) // random to make re-fetch obvious
    }),
    [EQUIPMENT_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR]: (state, action) => ({
        fetching: false,
        participants: initialState.participants
    //    set some sort of error message
    })

}, initialState);

export default participantsReducer;