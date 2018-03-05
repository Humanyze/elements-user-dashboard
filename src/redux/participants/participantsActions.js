import {createAction} from 'redux-actions';
// import axios from "axios";

import PARTICIPANTS_ACTION_TYPES from './participantsActionTypes';
import mockRes  from '../../mockParticipantRes.json';

const participantsFetchStarted = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED);
const participantsFetchSuccess = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS, data => data);
const participantsFetchError = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR, error => error);


const requestParticipantsData = () => async (dispatch, getState) => {
    dispatch(participantsFetchStarted());

    try {
        // this is just a mock to show loading
        setTimeout( async () => {
            const participantsData = mockRes;
            dispatch(participantsFetchSuccess(participantsData.participants));
        }, 4000);
    } catch (e) {
        dispatch(participantsFetchError(e.message))
    }
};

export {
    requestParticipantsData,
    participantsFetchStarted,
    participantsFetchSuccess,
    participantsFetchError
};

