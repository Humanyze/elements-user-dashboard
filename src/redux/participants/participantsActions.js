import {createAction} from 'redux-actions';
import PARTICIPANTS_ACTION_TYPES from './participantsActionTypes';
import {fetchWithAuth} from "../rootReducer";

const participantsFetchStarted = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED);
const participantsFetchSuccess = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS, data => data);
const participantsFetchError = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR, error => error);



// TODO: LOADING NEEDS TO BE DONE PARTIALLY
const requestParticipantsData = (datasetId) => async (dispatch, getState) => {
    console.error(datasetId);
    dispatch(participantsFetchStarted());

    try {
        // this is just a mock to show loading
        const bearerToken = getState().auth.tokenObj.access_token; // temp
        const res = await fetchWithAuth(`/api/v2/participants?dataset_id=${datasetId}&limit=20`, bearerToken);
        const data = await res.json();
        console.log(data);
        const particiantsById = data.participants.reduce((acc, participant) => ({
            ...acc,
            [participant.id]: participant
        }), {});
        dispatch(participantsFetchSuccess(particiantsById));

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

