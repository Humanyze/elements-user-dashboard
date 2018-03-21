import { createAction } from 'redux-actions';
import PARTICIPANTS_ACTION_TYPES from './participantsActionTypes';
import { fetchWithAuth } from '../rootReducer';

const participantsFetchStarted = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED);
const participantsFetchSuccess = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS, data => data);
const participantsFetchError = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR, error => error);


// TODO: LOADING NEEDS TO BE DONE PARTIALLY
const requestParticipantsData = (datasetId, perPage = 20, page = 1) => async (dispatch, getState) => {
    dispatch(participantsFetchStarted());

    try {
        // this is just a mock to show loading

        const offset = (page - 1) * perPage;
        const bearerToken = getState().auth.tokenObj.access_token; // temp
        const res = await fetchWithAuth(`/api/v2/participants?dataset_id=${datasetId}&limit=${perPage}&offset=${offset}`, bearerToken);
        const data = await res.json();
        console.log(data);
        const participantsById = data.participants.reduce((acc, participant) => ({
            ...acc,
            [participant.id]: participant
        }), {});
        setTimeout(() =>
            dispatch(participantsFetchSuccess({ participantsById, totalParticipantCount: data.meta.total_count })), 3000);
        // temp show loading ui
        // dispatch(participantsFetchSuccess({ participantsById, totalParticipantCount: data.meta.total_count })), 3000);

    } catch (e) {
        dispatch(participantsFetchError(e.message));
    }
};

export {
    requestParticipantsData,
    participantsFetchStarted,
    participantsFetchSuccess,
    participantsFetchError
};

