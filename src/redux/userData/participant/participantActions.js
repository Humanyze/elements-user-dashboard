import {createAction} from 'redux-actions';
import {fetchWithAuth} from "../../rootReducer";
import PARTICIPANT_ACTION_TYPES from './participantActionTypes';

const participantDataFetchRequested = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_REQUESTED);
const participantDataFetchSuccessful = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_SUCCESSFUL, participantData => participantData);
const participantDataFetchFailed = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_FAILED, error => error);


const getParticipantDataById = (id) => async (dispatch, getState) => {
    dispatch(participantDataFetchRequested());
    try {
        //    get participant data
        const bearerToken = getState().auth.tokenObj.access_token;
        const [ participantRes, participantRes ] = await Promise.all([
            fetchWithAuth(`/api/v1/participant/${id}/`, bearerToken),
            fetchWithAuth(`/api/v1/participant/?participant=${id}`, bearerToken)
        ]);


        // this flow won't be necessary once we get axios or some other client request libary working
        const data = await Promise.all[participantRes.json(), participantRes.json()];
        console.log(data);
        dispatch(participantDataFetchSuccessful(data));
    } catch (e) {
        dispatch(participantDataFetchFailed(e))
    }
};


export {
    getParticipantDataById,
    participantDataFetchRequested,
    participantDataFetchSuccessful,
    participantDataFetchFailed
}
