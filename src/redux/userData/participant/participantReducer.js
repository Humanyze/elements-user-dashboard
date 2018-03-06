import { handleActions } from 'redux-actions';
import USER_ACTION_TYPES from './participantActionTypes';


const initialState = {
    fetching: false,
    user: null
};

const participantReducer = handleActions({

}, initialState);


export default participantReducer;