import {createAction} from 'redux-actions';
import {fetchWithAuth} from "../../rootReducer";
import PARTICIPANT_ACTION_TYPES from './participantActionTypes';

const participantDataFetchRequested = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_REQUESTED);
const participantDataFetchSuccessful = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_SUCCESSFUL, participantData => participantData);
const participantDataFetchFailed = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_FAILED, error => error);


const setParticipantDataById = (id) => async (dispatch, getState) => {
    dispatch(participantDataFetchRequested());
    try {
        //    get participant data
        const bearerToken = getState().auth.tokenObj.access_token;
        const participantRes= await fetchWithAuth(`/api/v1/participant/?user=${id}`, bearerToken);
        const data = await participantRes.json();
        dispatch(participantDataFetchSuccessful(...data.participants));
    } catch (e) {
        dispatch(participantDataFetchFailed(e))
    }
};


export {
    setParticipantDataById,
    participantDataFetchRequested,
    participantDataFetchSuccessful,
    participantDataFetchFailed
}
