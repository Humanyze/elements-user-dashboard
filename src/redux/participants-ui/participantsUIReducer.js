import { handleActions } from 'redux-actions';
import PARTICIPANT_UI_ACTION_TYPES from './participantsUIActionTypes';


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




export default participantsUIReducer;